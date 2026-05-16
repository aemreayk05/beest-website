import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            return NextResponse.json(
                { message: 'E-posta servisi yapılandırılmamış. Lütfen daha sonra tekrar deneyin.' },
                { status: 503 }
            );
        }

        // CORS Origin Check (Basic Security)
        // Note: Next.js API routes are public by default, but we can verify origin if needed.
        // Vercel'de veya localde çalışırken izin verilen origin'leri kontrol edebilirsiniz
        // const origin = request.headers.get('origin');
        // if (origin && !origin.includes('localhost') && !origin.includes('sizin-domaininiz.com')) {
        //     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        // }

        const body = await request.json();
        const { name, email, phone, details, packageName, honeypot } = body;

        // 1. HONEYPOT CHECK (Bot Koruması)
        // Eğer gizli honeypot alanı doldurulmuşsa (botlar doldurur), mail atmadan başarılı gibi dön.
        if (honeypot) {
            console.log('Spam bot detected via honeypot.');
            return NextResponse.json({ message: 'Success' }, { status: 200 });
        }

        // 2. VALIDASYON (Zorunlu Alanlar)
        if (!name || !email || !details) {
            return NextResponse.json({ message: 'Ad, e-posta ve detay alanları zorunludur.' }, { status: 400 });
        }

        // 3. E-POSTA ŞABLONU OLUŞTURMA
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #111111; color: #ffffff; padding: 20px; text-align: center;">
                    <h2 style="margin: 0; color: #7F00FF;">Yeni Proje Talebi</h2>
                </div>
                <div style="padding: 30px; background-color: #f9f9f9;">
                    <p style="font-size: 16px; margin-bottom: 20px;">Web sitenizden yeni bir paket / teklif talebi geldi.</p>
                    
                    <div style="background-color: #ffffff; padding: 20px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                        <p><strong>Müşteri Adı:</strong> ${name}</p>
                        <p><strong>E-posta:</strong> <a href="mailto:${email}" style="color: #7F00FF;">${email}</a></p>
                        <p><strong>Telefon:</strong> ${phone || 'Belirtilmedi'}</p>
                        <p><strong>Seçilen Paket:</strong> <span style="background-color: #7F00FF; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${packageName || 'Belirtilmedi'}</span></p>
                        
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                        
                        <h4 style="margin-top: 0;">Proje Detayları:</h4>
                        <p style="white-space: pre-wrap; line-height: 1.6; color: #333;">${details}</p>
                    </div>
                </div>
                <div style="background-color: #eeeeee; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                    Bu mesaj sistem tarafından otomatik olarak gönderilmiştir.
                </div>
            </div>
        `;

        // 4. NODEMAILER AYARLARI
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: true, // 465 için true, 587 için false
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // 5. E-POSTAYI GÖNDER
        await transporter.sendMail({
            from: `"Beest Studio Web" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
            subject: `Yeni Talep: ${packageName || 'Genel'} - ${name}`,
            html: htmlContent,
            replyTo: email, // Cevapla dendiğinde direkt müşteriye gitsin
        });

        // 6. WHATSAPP BİLDİRİMLERİ (CallMeBot)
        try {
            // Mesaj Şablonu (URL Encode için düz metin)
            const waMessage = `🚨 *YENİ BİR TALEP GELDİ!* 🚨\n\n👤 *Ad Soyad:* ${name}\n📧 *E-posta:* ${email}\n📱 *Telefon:* ${phone || 'Belirtilmedi'}\n📦 *Paket:* ${packageName || 'Belirtilmedi'}\n\n📝 *Detaylar:*\n${details}`;
            
            // Encode mesaj (URL formatına uygun hale getir)
            const encodedMessage = encodeURIComponent(waMessage);

            const sendWaMessage = async (phoneStr: string | undefined, apiKey: string | undefined) => {
                if (!phoneStr || !apiKey || phoneStr === '+905550000000') return; // Placeholder koruması
                
                // Telefon numarasındaki + işaretini CallMeBot için formatla (%2B)
                const formattedPhone = phoneStr.startsWith('+') ? phoneStr.replace('+', '%2B') : phoneStr;
                const url = `https://api.callmebot.com/whatsapp.php?phone=${formattedPhone}&text=${encodedMessage}&apikey=${apiKey}`;
                
                const res = await fetch(url, { method: 'GET' });
                if (!res.ok) {
                    console.error(`WhatsApp Gönderim Hatası (${phoneStr}):`, await res.text());
                }
            };

            // Her iki yönetici için eşzamanlı bildirim gönder
            await Promise.all([
                sendWaMessage(process.env.WHATSAPP_ADMIN1_PHONE, process.env.WHATSAPP_ADMIN1_APIKEY),
                sendWaMessage(process.env.WHATSAPP_ADMIN2_PHONE, process.env.WHATSAPP_ADMIN2_APIKEY)
            ]);

        } catch (waError) {
            // WhatsApp API hatası ana süreci (formun başarılı gönderilmesini) bozmamalı
            console.error('WhatsApp Notification Error:', waError);
        }

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Email API Error:', error);
        return NextResponse.json(
            { message: 'Sunucu hatası oluştu. Mail gönderilemedi.' },
            { status: 500 }
        );
    }
}
