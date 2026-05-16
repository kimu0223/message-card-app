'use client'

// GoogleAnalyticsコンポーネントが自動でロードするgtagを使用
declare function gtag(
  command: 'event',
  eventName: string,
  params?: Record<string, string | number | boolean>,
): void

function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === 'undefined') return
  try {
    gtag('event', eventName, params ?? {})
  } catch {
    // gtag未ロード時は無視
  }
}

export const analytics = {
  // ─── /create ページ ───────────────────────────────────
  templateSelected(templateId: string, scene: string) {
    trackEvent('template_selected', { template_id: templateId, scene })
  },
  aiWizardOpened() {
    trackEvent('ai_wizard_opened')
  },
  blankStarted() {
    trackEvent('blank_canvas_started')
  },

  // ─── /create/editor ページ ────────────────────────────
  editorOpened(source: 'template' | 'ai' | 'blank' | 'direct') {
    trackEvent('editor_opened', { source })
  },
  firstEdit() {
    trackEvent('editor_first_edit')
  },
  previewOpened() {
    trackEvent('preview_opened')
  },
  previewClosed(didShare: boolean) {
    trackEvent('preview_closed', { did_share: didShare })
  },

  // ─── ログイン促進モーダル ─────────────────────────────
  signupModalShown(reason: string, trigger: string) {
    trackEvent('signup_modal_shown', { reason, trigger })
  },
  signupCtaClicked(reason: string) {
    trackEvent('signup_cta_clicked', { reason })
  },
  signupDismissed(reason: string) {
    trackEvent('signup_modal_dismissed', { reason })
  },
}
