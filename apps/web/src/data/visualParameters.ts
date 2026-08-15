export type VisualTier = "basic" | "advanced" | "professional";
export type VisualSelectionMode = "single" | "multiple";

export type VisualParameterOption = {
  id: string;
  labelZh: string;
  labelEn: string;
  icon: string;
  descriptionZh: string;
  promptZh: string;
  promptEn: string;
};

export type VisualParameterGroup = {
  id: string;
  titleZh: string;
  titleEn: string;
  tier: VisualTier;
  selection: VisualSelectionMode;
  options: VisualParameterOption[];
};

const option = (
  id: string,
  labelZh: string,
  labelEn: string,
  icon: string,
  descriptionZh: string,
  promptZh: string,
  promptEn: string
): VisualParameterOption => ({ id, labelZh, labelEn, icon, descriptionZh, promptZh, promptEn });

export const IMAGE_VISUAL_GROUPS: VisualParameterGroup[] = [
  {
    id: "view",
    titleZh: "视角",
    titleEn: "View",
    tier: "basic",
    selection: "single",
    options: [
      option("front", "正面", "Front view", "◫", "主体正对镜头，结构最直观。", "正面视角，主体正对镜头", "front view, subject facing the camera"),
      option("three-quarter", "3/4 视角", "Three-quarter view", "◩", "兼顾正面与侧面立体信息。", "3/4视角，保留面部与侧面立体结构", "three-quarter view, balanced frontal and side geometry"),
      option("forty-five", "45° 视角", "45-degree view", "◪", "明确的半侧转向。", "45度视角，自然半侧转向", "45-degree view, natural half-profile"),
      option("strict-side", "严格侧面", "Strict side profile", "◧", "严格 90° 侧面轮廓。", "严格90度侧面视角，完整侧面轮廓", "strict 90-degree side profile, complete silhouette"),
      option("back", "背面", "Back view", "◨", "展示背部、后脑和服装背面。", "背面视角，展示主体背部结构", "back view, show the rear structure of the subject"),
      option("three-view", "三视图", "Three-view sheet", "▥", "正面、侧面、背面统一展示。", "正面、严格侧面、背面三视图，比例一致", "front, strict side and back three-view sheet, consistent proportions"),
      option("top", "顶视", "Top view", "⌄", "相机从主体正上方观察。", "顶视角，从主体正上方观察", "top-down view from directly above the subject"),
      option("bird-eye", "鸟瞰", "Bird's-eye view", "▽", "高空斜向俯视，强调空间关系。", "鸟瞰视角，高位斜向俯视空间", "bird's-eye view, elevated oblique view of the space"),
      option("worm-eye", "仰视", "Worm's-eye view", "△", "由下向上观察，增强体量感。", "仰视角度，由下向上观察主体", "worm's-eye view, looking upward at the subject"),
      option("over-shoulder", "越肩视角", "Over-the-shoulder", "◒", "从前景人物肩后观察目标。", "越肩视角，前景肩部形成空间层次", "over-the-shoulder view with foreground shoulder framing")
    ]
  },
  {
    id: "shot",
    titleZh: "景别",
    titleEn: "Shot Size",
    tier: "basic",
    selection: "single",
    options: [
      option("extreme-close", "超特写", "Extreme close-up", "◎", "聚焦眼睛、嘴唇或微小细节。", "超特写，只聚焦局部关键细节", "extreme close-up focused on a small key detail"),
      option("close-up", "特写", "Close-up", "◉", "人物脸部或产品主要细节占画面。", "特写景别，主体细节占据主要画面", "close-up shot, subject details dominate the frame"),
      option("head-shoulders", "头肩", "Head and shoulders", "◍", "适合身份肖像和角色脸部资产。", "头肩肖像景别，完整保留头部与肩线", "head-and-shoulders portrait framing"),
      option("bust", "胸像", "Bust shot", "◐", "头部到胸部区域。", "胸像景别，从头部到胸部完整入镜", "bust shot, framed from head to chest"),
      option("medium", "半身", "Medium shot", "♟", "腰部以上，兼顾表情与动作。", "半身景别，腰部以上入镜", "medium shot, framed from the waist up"),
      option("three-quarter-body", "3/4 身", "Three-quarter body", "♜", "膝部附近以上，适合服装与姿态。", "四分之三身景别，展示服装和姿态", "three-quarter body shot showing outfit and pose"),
      option("full-body", "全身", "Full body", "♙", "完整人物或物体全部进入画面。", "全身景别，主体完整入镜不裁切", "full-body shot, entire subject visible without cropping"),
      option("wide", "全景", "Wide shot", "▭", "主体与环境关系并重。", "全景景别，主体与环境关系清晰", "wide shot with clear subject-environment relationship"),
      option("extreme-wide", "大远景", "Extreme wide shot", "▬", "环境占主导，主体尺度较小。", "大远景，环境占据画面主体", "extreme wide shot, environment dominates the frame"),
      option("macro", "微距", "Macro", "⌕", "强调表面纹理与微小结构。", "微距特写，突出表面纹理和微小结构", "macro shot emphasizing surface texture and micro detail")
    ]
  },
  {
    id: "composition",
    titleZh: "构图",
    titleEn: "Composition",
    tier: "basic",
    selection: "multiple",
    options: [
      option("center", "中央构图", "Centered composition", "⊙", "主体位于视觉中心，稳定直接。", "中央构图，主体位于画面视觉中心", "centered composition, subject placed at the visual center"),
      option("thirds", "三分法", "Rule of thirds", "#", "主体落在三分线或交点。", "三分法构图，主体落在三分线交点", "rule-of-thirds composition"),
      option("symmetry", "对称构图", "Symmetrical composition", "◇", "左右或上下形成明确对称。", "对称构图，画面结构平衡规整", "symmetrical composition with balanced visual structure"),
      option("golden", "黄金分割", "Golden ratio", "φ", "使用黄金比例组织视觉焦点。", "黄金分割构图，视觉焦点自然集中", "golden-ratio composition with a natural focal point"),
      option("diagonal", "对角线", "Diagonal composition", "╱", "利用斜线增强方向感和动势。", "对角线构图，强化画面方向和动势", "diagonal composition emphasizing direction and movement"),
      option("leading-lines", "引导线", "Leading lines", "≫", "利用道路、光线或结构引向主体。", "引导线构图，环境线条汇聚到主体", "leading-line composition guiding the eye toward the subject"),
      option("frame-within", "框中框", "Frame within frame", "▣", "门窗或前景结构形成二次框景。", "框中框构图，利用前景结构包围主体", "frame-within-frame composition using foreground structures"),
      option("negative-space", "大面积留白", "Negative space", "□", "大量空白强化主体和版式感。", "大面积留白构图，主体与负空间对比明确", "negative-space composition with generous empty space"),
      option("foreground", "前景遮挡", "Foreground occlusion", "◈", "加入虚化或局部前景增强空间深度。", "前景遮挡构图，利用前景增加纵深层次", "foreground occlusion to create depth and layering"),
      option("layered", "多层纵深", "Layered depth", "≋", "前景、中景、背景形成明显三层。", "前中后景多层纵深构图", "layered foreground, midground and background depth")
    ]
  },
  {
    id: "lighting",
    titleZh: "光线",
    titleEn: "Lighting",
    tier: "basic",
    selection: "multiple",
    options: [
      option("soft-studio", "柔和棚拍光", "Soft studio light", "☁", "大面积柔光，阴影干净。", "柔和棚拍光，大面积柔光源，阴影过渡自然", "soft studio lighting, large soft source, gentle shadow transitions"),
      option("cinematic-side", "电影侧光", "Cinematic side light", "◐", "侧向主光塑造体积和情绪。", "电影感侧光，侧向主光塑造立体层次", "cinematic side lighting sculpting dimensional form"),
      option("window", "自然窗光", "Window light", "▤", "模拟真实窗边柔和自然光。", "自然窗光，柔和真实的室内日光", "natural window light, soft realistic indoor daylight"),
      option("backlight", "逆光", "Backlight", "☀", "光源位于主体后方。", "逆光照明，主体边缘形成明亮分离", "backlighting with bright edge separation"),
      option("rim", "轮廓光", "Rim light", "◒", "边缘高光强调轮廓。", "轮廓光，清晰勾勒主体外轮廓", "rim lighting clearly outlining the subject silhouette"),
      option("top", "顶光", "Top light", "▼", "上方光源产生强烈结构阴影。", "顶光照明，从上方塑造结构阴影", "top lighting creating structural downward shadows"),
      option("low-key", "低调光", "Low-key lighting", "●", "暗部占比高，高反差电影氛围。", "低调光，高暗部占比和克制高光", "low-key lighting with dominant shadows and restrained highlights"),
      option("high-key", "高调光", "High-key lighting", "○", "整体明亮、阴影较弱。", "高调光，整体明亮、阴影轻柔", "high-key lighting, bright scene with soft shadows"),
      option("neon", "霓虹灯光", "Neon lighting", "✦", "彩色人工光源形成强烈氛围。", "霓虹灯光，多色人工光源交错", "neon lighting with layered colored artificial lights"),
      option("volumetric", "体积光", "Volumetric light", "⋰", "可见光束与空气介质强化空间。", "体积光，可见光束穿过空气形成空间层次", "volumetric lighting with visible light beams and atmospheric depth")
    ]
  },
  {
    id: "medium",
    titleZh: "视觉媒介",
    titleEn: "Visual Medium",
    tier: "basic",
    selection: "single",
    options: [
      option("photo-real", "照片级真实", "Photorealistic", "◉", "真实摄影、自然材质与光学表现。", "照片级真实摄影质感，真实材质与自然光学表现", "photorealistic photography, realistic materials and natural optics"),
      option("semi-real", "半写实", "Semi-realistic", "◍", "真实比例基础上的适度艺术化。", "半写实视觉风格，真实比例结合适度艺术化", "semi-realistic visual style with realistic proportions and controlled stylization"),
      option("guoman-3d", "3D 国漫", "3D Guoman", "◆", "半写实国漫 CG 与精细 Shader。", "高品质3D国漫半写实风格，精细Shader与清晰材质", "high-quality semi-realistic 3D Guoman style with refined shaders"),
      option("concept", "概念艺术", "Concept art", "✦", "强调设计语言、氛围和叙事概念。", "高完成度概念艺术，强调设计语言和氛围叙事", "high-fidelity concept art emphasizing design language and atmosphere"),
      option("product-render", "产品渲染", "Product render", "◇", "商业级 3D/PBR 产品表现。", "商业级产品渲染，结构准确，PBR材质清晰", "commercial product render with accurate geometry and clear PBR materials"),
      option("anime", "动漫", "Anime", "☆", "二维动漫角色与干净色块。", "高品质动漫风格，干净线条与色块", "high-quality anime style with clean lines and color blocks"),
      option("illustration", "数字插画", "Digital illustration", "✎", "绘画感数字插画。", "精细数字插画，清晰笔触和层次", "refined digital illustration with clear painterly detail"),
      option("oil", "油画", "Oil painting", "▧", "厚重色彩与油画笔触。", "油画媒介，丰富颜料质感与可见笔触", "oil painting medium with rich pigment texture and visible brushwork"),
      option("watercolor", "水彩", "Watercolor", "≈", "透明水色、纸张纹理和柔和边缘。", "水彩画媒介，透明色层、纸张纹理、柔和边缘", "watercolor medium with translucent washes, paper texture and soft edges"),
      option("minimal", "极简", "Minimal", "□", "减少元素、强调形状和留白。", "极简视觉语言，减少元素，强调形状与留白", "minimal visual language with reduced elements and strong negative space")
    ]
  },
  {
    id: "cameraHeight",
    titleZh: "相机高度",
    titleEn: "Camera Height",
    tier: "advanced",
    selection: "single",
    options: [
      option("eye", "眼平机位", "Eye level", "—", "自然中性的观察高度。", "眼平机位，相机与主体视线基本等高", "eye-level camera aligned with the subject's natural eye line"),
      option("chest", "胸口机位", "Chest level", "―", "略低于视线，适合人物全身。", "胸口高度机位，自然轻微仰视", "chest-level camera with a subtle upward perspective"),
      option("waist", "腰部机位", "Waist level", "⌁", "更低的稳定机位，强调身体或产品体量。", "腰部高度机位，强化主体体量感", "waist-level camera emphasizing subject mass and presence"),
      option("ground", "地面机位", "Ground level", "▁", "非常贴近地面。", "地面低机位，相机贴近地面", "ground-level camera positioned very close to the floor"),
      option("low", "低机位", "Low angle", "⌃", "由低处向上拍摄，增强力量感。", "低机位拍摄，轻微向上观察主体", "low-angle camera looking slightly upward"),
      option("high", "高机位", "High angle", "⌄", "从较高位置俯看主体。", "高机位拍摄，轻微向下俯视主体", "high-angle camera looking slightly downward"),
      option("overhead", "正上方机位", "Overhead", "⊤", "相机垂直位于主体上方。", "正上方垂直机位，平面化展示空间", "direct overhead camera creating a plan-like view"),
      option("knee", "膝部机位", "Knee level", "┄", "低于腰线但不极端。", "膝部高度机位，低位透视但不过度夸张", "knee-level camera with controlled low perspective"),
      option("shoulder", "肩部机位", "Shoulder level", "━", "接近人物肩高，适合跟随视角。", "肩部高度机位，接近人物观察视线", "shoulder-level camera for a natural observational perspective"),
      option("elevated", "高位俯拍", "Elevated", "⌄⌄", "明显高于主体但保持斜向透视。", "高位俯拍机位，明显高于主体且保持斜向透视", "elevated oblique camera clearly above the subject")
    ]
  },
  {
    id: "lens",
    titleZh: "镜头 / 焦段",
    titleEn: "Lens / Focal Length",
    tier: "advanced",
    selection: "single",
    options: [
      option("14mm", "14mm 超广角", "14mm ultra-wide", "14", "强烈空间扩张和边缘透视。", "14mm超广角镜头，强烈空间透视与宽广视野", "14mm ultra-wide lens, dramatic spatial perspective and expansive field of view"),
      option("20mm", "20mm 广角", "20mm wide", "20", "宽广视野与明显空间感。", "20mm广角镜头，宽广视野和明显空间纵深", "20mm wide-angle lens with expansive spatial depth"),
      option("24mm", "24mm 广角", "24mm wide", "24", "常见环境人像和建筑视角。", "24mm广角镜头，强调环境与空间关系", "24mm wide-angle lens emphasizing environment and spatial relationships"),
      option("35mm", "35mm 纪实", "35mm documentary", "35", "自然环境感与轻度广角。", "35mm镜头，自然纪实透视，主体与环境平衡", "35mm lens, natural documentary perspective balancing subject and environment"),
      option("50mm", "50mm 标准", "50mm standard", "50", "接近自然观察比例。", "50mm标准镜头，自然透视与均衡比例", "50mm standard lens with natural perspective and balanced proportions"),
      option("85mm", "85mm 人像", "85mm portrait", "85", "轻微空间压缩和自然人脸比例。", "85mm人像镜头，轻微空间压缩，自然面部比例", "85mm portrait lens, gentle compression and natural facial proportions"),
      option("100mm", "100mm 微距", "100mm macro", "100", "适合产品与局部高细节。", "100mm微距镜头，细节清晰，透视压缩自然", "100mm macro lens with crisp detail and natural compression"),
      option("135mm", "135mm 长焦", "135mm telephoto", "135", "明显压缩背景与主体关系。", "135mm长焦镜头，明显背景压缩和主体分离", "135mm telephoto lens with strong background compression and subject separation"),
      option("200mm", "200mm 长焦", "200mm telephoto", "200", "远距离拍摄与强烈空间压缩。", "200mm长焦镜头，强烈空间压缩和远距离观察", "200mm telephoto lens with strong compression and distant viewpoint"),
      option("fisheye", "鱼眼镜头", "Fisheye", "◉", "极端弯曲透视与超宽视野。", "鱼眼镜头，极端广角和明显桶形变形", "fisheye lens with extreme field of view and pronounced barrel distortion")
    ]
  },
  {
    id: "depth",
    titleZh: "景深 / 对焦",
    titleEn: "Depth of Field",
    tier: "advanced",
    selection: "single",
    options: [
      option("ultra-shallow", "极浅景深", "Ultra-shallow DOF", "•", "焦点极薄，背景强烈虚化。", "极浅景深，焦点极薄，背景强烈奶油化虚化", "ultra-shallow depth of field with a razor-thin focus plane and creamy blur"),
      option("shallow", "浅景深", "Shallow DOF", "●", "主体清晰，背景柔和虚化。", "浅景深，主体清晰，背景自然柔化", "shallow depth of field with a sharp subject and softly blurred background"),
      option("medium", "中等景深", "Medium DOF", "◉", "主体和部分环境保持清晰。", "中等景深，主体与附近环境保持可读细节", "medium depth of field retaining detail in subject and nearby environment"),
      option("deep", "深景深", "Deep DOF", "◎", "前后景大部分清晰。", "深景深，前景到背景大部分区域清晰", "deep depth of field keeping most foreground and background sharp"),
      option("infinite", "全景清晰", "Deep focus", "∞", "整个场景近似全清晰。", "全景深对焦，整个场景保持清晰", "deep focus with the entire scene kept sharp"),
      option("rack-subject", "主体焦点", "Subject focus", "⊙", "焦点严格锁定核心主体。", "焦点锁定核心主体，其他区域自然衰减", "focus locked precisely on the main subject with natural falloff"),
      option("eye-focus", "眼部对焦", "Eye focus", "◉", "人物眼睛作为最清晰区域。", "精准眼部对焦，虹膜和睫毛保持最高清晰度", "precise eye focus with iris and eyelashes at maximum sharpness"),
      option("foreground-focus", "前景对焦", "Foreground focus", "◐", "前景清晰，主体或背景渐虚。", "前景对焦，前景清晰，后方主体逐渐虚化", "foreground focus with progressive blur toward the subject and background"),
      option("background-focus", "背景对焦", "Background focus", "◑", "背景清晰，前景虚化形成遮挡感。", "背景对焦，前景柔化形成空间遮挡", "background focus with softened foreground for spatial occlusion"),
      option("tilt-shift", "移轴焦平面", "Tilt-shift focus", "▱", "窄带焦点与模型感。", "移轴式窄带焦平面，产生精确选择性对焦", "tilt-shift selective focus with a narrow controlled focus band")
    ]
  },
  {
    id: "color",
    titleZh: "色彩关系",
    titleEn: "Color Palette",
    tier: "advanced",
    selection: "multiple",
    options: [
      option("warm", "暖色调", "Warm palette", "◒", "橙、红、金等暖色主导。", "暖色调配色，以橙红金色为主要视觉温度", "warm color palette dominated by orange, red and golden hues"),
      option("cool", "冷色调", "Cool palette", "◓", "蓝、青、紫等冷色主导。", "冷色调配色，以蓝青紫色为主要视觉温度", "cool color palette dominated by blue, cyan and violet hues"),
      option("neutral", "中性色", "Neutral palette", "◐", "灰、米、黑白等中性色主导。", "中性色配色，灰米黑白为主体，色彩克制", "neutral palette dominated by gray, beige, black and white"),
      option("monochrome", "单色系", "Monochrome", "●", "围绕一个主色做明度变化。", "单色系配色，围绕单一主色建立明度层次", "monochrome palette using tonal variations of one dominant hue"),
      option("complementary", "互补色", "Complementary colors", "◑", "使用色轮对侧颜色形成张力。", "互补色关系，使用对立色相形成视觉张力", "complementary color relationship with opposing hues for visual tension"),
      option("analogous", "邻近色", "Analogous colors", "◔", "相邻色相形成和谐过渡。", "邻近色配色，相邻色相平滑和谐过渡", "analogous color palette with harmonious neighboring hues"),
      option("teal-orange", "青橙", "Teal and orange", "◈", "电影常用冷暖互补。", "青橙电影配色，冷青阴影与暖橙高光", "cinematic teal-and-orange grade with cool shadows and warm highlights"),
      option("black-gold", "黑金", "Black and gold", "◆", "黑色基底配金色高光。", "黑金配色，深黑基底与金色高光形成高级对比", "black-and-gold palette with deep black base and refined golden highlights"),
      option("low-sat", "低饱和", "Low saturation", "◌", "整体色彩克制、灰度提高。", "低饱和配色，整体克制柔和，减少鲜艳色彩", "low-saturation palette with restrained, muted colors"),
      option("high-sat", "高饱和", "High saturation", "✹", "鲜艳高纯度色彩。", "高饱和配色，鲜明高纯度色彩关系", "high-saturation palette with vivid high-chroma colors")
    ]
  },
  {
    id: "atmosphere",
    titleZh: "环境 / 氛围",
    titleEn: "Environment / Atmosphere",
    tier: "professional",
    selection: "multiple",
    options: [
      option("clear", "清透空气", "Clear atmosphere", "○", "空气干净，远景对比保持稳定。", "清透空气，环境能见度高，远景细节清晰", "clear atmosphere with high visibility and crisp distant detail"),
      option("mist", "薄雾", "Light mist", "≋", "柔和空气透视与轻微雾化。", "轻薄雾气，柔和空气透视和远景衰减", "light mist with soft atmospheric perspective and distant falloff"),
      option("fog", "浓雾", "Dense fog", "☁", "强烈雾化、轮廓衰减。", "浓雾环境，远景明显衰减，只保留主体轮廓层次", "dense fog with strong distance falloff and layered silhouettes"),
      option("rain", "雨天", "Rain", "╱", "雨丝、湿润表面和反射。", "雨天环境，可见雨丝、湿润表面与地面反射", "rainy environment with visible rainfall, wet surfaces and reflections"),
      option("snow", "雪景", "Snow", "✧", "飘雪与冷色环境反射。", "雪景环境，细小飘雪与冷色环境反射", "snowy atmosphere with fine falling snow and cool environmental bounce"),
      option("dust", "尘埃颗粒", "Dust particles", "·", "空气中可见微粒增强光束。", "空气尘埃微粒，在逆光中形成可见颗粒层次", "suspended dust particles visible in backlight for atmospheric depth"),
      option("golden-hour", "黄金时刻", "Golden hour", "☀", "日出日落附近的低角度暖光。", "黄金时刻环境，低角度暖阳与柔和长阴影", "golden-hour atmosphere with low warm sunlight and soft long shadows"),
      option("blue-hour", "蓝调时刻", "Blue hour", "☾", "日落后冷蓝环境光。", "蓝调时刻，冷蓝环境光与残余暖光平衡", "blue-hour atmosphere balancing cool ambient light and residual warmth"),
      option("night", "夜景", "Night", "☽", "低环境照度与人工光源主导。", "夜景环境，低环境照度，人工光源成为主要照明", "night environment with low ambient illumination and dominant artificial lights"),
      option("studio-clean", "纯净棚景", "Clean studio", "▢", "无干扰背景与可控环境。", "纯净棚拍环境，背景简洁，无多余视觉干扰", "clean studio environment with controlled background and minimal distractions")
    ]
  }
];

export const VISUAL_TIER_LABELS: Record<VisualTier, { zh: string; en: string }> = {
  basic: { zh: "基础", en: "Basic" },
  advanced: { zh: "高级", en: "Advanced" },
  professional: { zh: "专业", en: "Professional" }
};

export function emptyVisualSelections(): Record<string, string[]> {
  return Object.fromEntries(IMAGE_VISUAL_GROUPS.map((group) => [group.id, []]));
}

export function findVisualOptionByLabel(label: string) {
  for (const group of IMAGE_VISUAL_GROUPS) {
    const matched = group.options.find((item) => item.labelZh === label || item.labelEn === label);
    if (matched) return { group, option: matched };
  }
  return null;
}

export function countVisualOptions() {
  return IMAGE_VISUAL_GROUPS.reduce((total, group) => total + group.options.length, 0);
}
