export type LaunchCampaignEvent =
    | 'launch_modal_shown'
    | 'launch_modal_closed'
    | 'launch_modal_primary_cta_clicked'
    | 'launch_modal_secondary_cta_clicked';

/** Analytics hook point — wire gtag/dataLayer when available */
export function trackLaunchCampaignEvent(event: LaunchCampaignEvent): void {
    void event;
    // intentionally noop until analytics is configured
}
