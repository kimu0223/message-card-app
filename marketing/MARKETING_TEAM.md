# マーケティングチーム — エージェント構成

## チーム概要

プロダクト: 贈りことば (OkuriKotoba)
ターゲット: デザインセンスがない男性、贈り物のカードを作りたい全ユーザー
主要流入: X (Twitter) — Organic Social 72%

---

## エージェント一覧

| エージェント | ファイル | 担当領域 | 起動タイミング |
|---|---|---|---|
| Xストラテジスト | `agents/x-strategy-agent.md` | X投稿・バイラル設計 | 週次 |
| ファネルアナリスト | `agents/funnel-analyst-agent.md` | GA4データ分析・ボトルネック特定 | 週次 |
| CROエージェント | `agents/cro-agent.md` | LP・エディタのUX改善 | 施策前後 |
| コンテンツエージェント | `agents/content-agent.md` | ブログ・X文章・SEO | 週2回 |
| リテンションエージェント | `agents/retention-agent.md` | 無料→有料転換・再訪設計 | 月次 |

---

## エージェント起動方法（Claude Code）

各エージェントは Claude Code の Agent ツールでサブエージェントとして起動します。

```
# 例: Xストラテジストを起動して今週のポスト案を生成
Agent(subagent_type="general", prompt="marketing/agents/x-strategy-agent.md の定義に従い、今週（父の日特集）のX投稿を5本生成してください")
```

---

## 週次オペレーション

```
月曜: ファネルアナリスト → 先週のGA4レポート確認
火曜: Xストラテジスト → 今週のポストカレンダー作成
水曜: コンテンツエージェント → ブログ記事 or X Thread 1本
木曜: CROエージェント → A/Bテスト仮説設定
金曜: リテンションエージェント → 無料ユーザー転換施策チェック
```

---

## KPI（最重要指標）

| 指標 | 現状 | 目標（30日後） |
|---|---|---|
| LP→/create CTR | 41% | 60% |
| /create→/editor CTR | 36% | 65% |
| /editor→signup 転換率 | ~0% | 20% |
| 週間アクティブユーザー | ~30人 | 100人 |
| 有料転換率 | 不明 | 5% |
