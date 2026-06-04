/**
 * Core data types for the WCAG Accessibility Dashboard.
 *
 * Every interface maps 1-to-1 to a CSV or JSON file in public/data/outputs/.
 * Column names are preserved from the original Portuguese/English data files.
 */

// ---------------------------------------------------------------------------
// Enums & constants
// ---------------------------------------------------------------------------

/** Severity levels as they appear in the raw data. */
export type Severidade = 'critico' | 'serio' | 'moderado' | 'menor';

/** All known WCAG rule IDs found in the dataset. */
export type WcagRuleId =
  | 'accesskeys'
  | 'aria-allowed-attr'
  | 'aria-command-name'
  | 'aria-hidden-focus'
  | 'aria-input-field-name'
  | 'aria-required-children'
  | 'aria-required-parent'
  | 'button-name'
  | 'color-contrast'
  | 'definition-list'
  | 'document-title'
  | 'frame-title'
  | 'heading-order'
  | 'html-has-lang'
  | 'image-alt'
  | 'input-button-name'
  | 'label'
  | 'label-content-name-mismatch'
  | 'landmark-one-main'
  | 'link-in-text-block'
  | 'link-name'
  | 'list'
  | 'listitem'
  | 'meta-viewport'
  | 'select-name'
  | 'skip-link'
  | 'tabindex'
  | 'target-size'
  | 'td-has-header';

// ---------------------------------------------------------------------------
// Raw datasets (large files)
// ---------------------------------------------------------------------------

/** Row from dataset_tratado.csv — the cleaned base dataset. */
export interface DatasetTratado {
  url_origem: string;
  regra_wcag_id: string;
  titulo_erro: string;
  seletor_css: string;
  snippet_html: string;
}

/** Row from dataset_com_severidade.csv — extends the base dataset with severity. */
export interface DatasetComSeveridade extends DatasetTratado {
  tag_html: string;
  severidade: Severidade;
}

// ---------------------------------------------------------------------------
// Violations & errors
// ---------------------------------------------------------------------------

/** Row from top_violacoes_wcag.csv — top WCAG violations ranked by count. */
export interface TopViolacao {
  regra_wcag_id: string;
  count: number;
}

/** Row from erros_por_site.csv — error count per URL. */
export interface ErrosPorSite {
  url_origem: string;
  count: number;
}

/** Row from top_dominios.csv — top domains by error count. */
export interface TopDominio {
  dominio: string;
  count: number;
}

/** Row from top_tags_html.csv — HTML tags ranked by error count. */
export interface TopTagHtml {
  tag_html: string;
  count: number;
}

/** Row from top_selectors_css.csv — CSS selectors ranked by error count. */
export interface TopSelectorCss {
  seletor_css: string;
  count: number;
}

// ---------------------------------------------------------------------------
// Severity
// ---------------------------------------------------------------------------

/** Row from distribuicao_severidade.csv — severity distribution counts. */
export interface DistribuicaoSeveridade {
  severidade: Severidade;
  count: number;
}

/** Row from comparacao_grupos.csv — group comparison (tag groups). */
export interface ComparacaoGrupos {
  grupo_tag: string;
  quantidade: number;
}

// ---------------------------------------------------------------------------
// Correlation matrix
// ---------------------------------------------------------------------------

/**
 * Row from correlacao_violacoes.csv — correlation between WCAG rules.
 * The first column is the rule ID; remaining columns are numeric correlation values.
 */
export interface CorrelacaoViolacao {
  regra_wcag_id: string;
  [ruleId: string]: string | number;
}

// ---------------------------------------------------------------------------
// Site-violation matrix
// ---------------------------------------------------------------------------

/**
 * Row from matriz_site_violacao.csv — cross-tabulation of sites × violations.
 * First column is the URL; remaining columns are violation counts.
 */
export interface MatrizSiteViolacao {
  url_origem: string;
  [ruleId: string]: string | number;
}

// ---------------------------------------------------------------------------
// Features & clustering
// ---------------------------------------------------------------------------

/**
 * Row from features_engineering.csv — engineered features per URL.
 * Violation rule columns are numeric counts, plus total_erros and diversidade_erros.
 */
export interface FeaturesEngineering {
  url_origem: string;
  total_erros: number;
  diversidade_erros: number;
  [ruleId: string]: string | number;
}

/**
 * Row from features_clusterizadas.csv — same as FeaturesEngineering + cluster label.
 */
export interface FeaturesClusterizadas extends FeaturesEngineering {
  cluster: number;
}

/** Row from pca_clusters.csv — PCA-reduced coordinates with cluster label. */
export interface PcaCluster {
  pca_1: number;
  pca_2: number;
  cluster: number;
}

// ---------------------------------------------------------------------------
// ML metrics
// ---------------------------------------------------------------------------

/**
 * Row from classification_report.csv — per-class or aggregate metrics.
 * The first column is an unnamed index (class label or summary row).
 */
export interface ClassificationReportRow {
  label: string;
  precision: number;
  recall: number;
  f1_score: number;
  support: number;
}

/**
 * From matriz_confusao.csv — confusion matrix cells.
 * Stored as a 2D number array for flexible rendering.
 */
export type ConfusionMatrix = number[][];

/** From metricas_modelo.json — aggregate model performance metrics. */
export interface MetricasModelo {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
}

/** Row from features_importantes.csv — feature importance scores. */
export interface FeatureImportante {
  regra_wcag_id: string;
  importance: number;
}

// ---------------------------------------------------------------------------
// Association rules & co-occurrence
// ---------------------------------------------------------------------------

/** Row from regras_associacao.csv — association rules with all metrics. */
export interface RegraAssociacao {
  antecedents: string;
  consequents: string;
  antecedent_support: number;
  consequent_support: number;
  support: number;
  confidence: number;
  lift: number;
  representativity: number;
  leverage: number;
  conviction: number;
  zhangs_metric: number;
  jaccard: number;
  certainty: number;
  kulczynski: number;
}

/** Row from frequent_itemsets.csv — frequent itemsets with support. */
export interface FrequentItemset {
  support: number;
  itemsets: string;
}

/** Row from rede_coocorrencia.csv — co-occurrence network edges. */
export interface RedeCoocorrencia {
  source: string;
  target: string;
  weight: number;
}

// ---------------------------------------------------------------------------
// Insights
// ---------------------------------------------------------------------------

/** A single analytical insight from insights.json. */
export interface Insight {
  id: number;
  titulo: string;
  descricao: string;
  evidencias: string[];
  impacto_pratico: string[];
}

/** Root shape of insights.json. */
export interface InsightsData {
  insights: Insight[];
}
