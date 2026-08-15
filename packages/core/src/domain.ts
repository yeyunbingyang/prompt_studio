export type Modality = "image" | "video" | "3d" | "audio" | "text";
export type AssetStatus = "draft" | "active" | "archived";

export type PromptVariant = {
  id: string;
  asset_id: string;
  name: string;
  language: string;
  model_family?: string | null;
  positive_prompt: string;
  negative_prompt?: string | null;
  structured_parameters: Record<string, unknown>;
  revision: number;
};

export type CreationAssetSummary = {
  id: string;
  title: string;
  modality: Modality;
  description: string;
  status: AssetStatus;
  template_id?: string | null;
  cover_media_id?: string | null;
  forked_from?: string | null;
  created_at: string;
  updated_at: string;
};

export type CreationAssetDetail = CreationAssetSummary & {
  prompt_variants: PromptVariant[];
};

export type TemplateParameterOption = {
  id: string;
  label: string;
  prompt_fragment: string;
  preview_media_id?: string;
  metadata?: Record<string, unknown>;
};

export type TemplateParameterGroup = {
  id: string;
  label: string;
  selection: "single" | "multiple";
  required?: boolean;
  options: TemplateParameterOption[];
};

export type TemplateDefinition = {
  id: string;
  version: number;
  title: string;
  modality: Modality;
  groups: TemplateParameterGroup[];
};
