const MODE_DATA={
 image:{label:'图片',models:['GPT Image','Gemini Image','Midjourney','FLUX','Stable Diffusion / SDXL','Ideogram','Recraft'],presets:['通用生成','人像摄影','角色设计','三视图 / 设定图','产品摄影','电影剧照','动漫 / 国漫','建筑 / 室内','海报 / 排版','灰模 / 人体比例']},
 video:{label:'视频',models:['Veo','Sora','Kling','Runway','Seedance','Hailuo','Luma Dream Machine','Pika','PixVerse'],presets:['通用视频','人物动作','电影镜头','Image-to-Video','首尾帧','角色一致性','产品广告','短视频运镜','多镜头分镜']},
 '3d':{label:'3D',models:['通用 Text-to-3D','Mesh 生成','图像转 3D','本地 3D 工作流'],presets:['角色模型','产品模型','场景模型','雕塑 / 手办','灰模']},
 audio:{label:'音频',models:['Suno','Udio','Stable Audio','ElevenLabs','Lyria','MusicGen'],presets:['音乐','配乐','环境音','音效','旁白 / TTS','歌曲']}
};
const VISUAL={
 composition:[['正面','◫'],['严格侧面','◧'],['三视图','▥'],['全身','♙'],['半身','♟'],['特写','◉'],['低机位','⌃'],['俯拍','⌄']],
 lighting:[['柔和棚拍光','☁'],['电影侧光','◐'],['自然窗光','▤'],['逆光','☀'],['轮廓光','◒'],['霓虹灯光','✦'],['体积光','⋰'],['低调光','●']],
 style:[['照片级真实','◉'],['半写实','◍'],['3D 国漫','◆'],['概念艺术','✦'],['产品渲染','◇'],['极简','□'],['复古胶片','▧'],['赛博朋克','⌁']]
};
const TEMPLATES=[
 {id:'portrait',icon:'◉',type:'image',name:'电影感人像摄影',desc:'人物、镜头、构图、灯光、材质与环境的结构化人像模板。',tags:['人像','摄影','灯光'],subject:'一位成年人物，真实摄影质感，身份特征稳定',negative:'低清晰度、五官错位、过度磨皮、畸形手指',preset:'人像摄影',style:['照片级真实'],lighting:['电影侧光']},
 {id:'character-sheet',icon:'▥',type:'image',name:'人物设定 / 三视图',desc:'正面、45°、侧面或背面的一致性角色设定结构。',tags:['角色','三视图','一致性'],subject:'同一成年角色的角色设定图，保持统一身份与连续三维结构',negative:'身份漂移、不同角度重新设计五官、镜像代替真实侧面、比例不一致',preset:'三视图 / 设定图',composition:['三视图','全身']},
 {id:'graymodel',icon:'♙',type:'image',name:'无脸灰模 / 人体比例',desc:'用于记录身体比例、骨架与轮廓的非敏感灰模模板。',tags:['灰模','比例','人体'],subject:'成年人物无脸中性灰模，作为身体比例和轮廓参考资产，不表现敏感解剖细节',negative:'敏感解剖细节、夸张透视、肢体畸形、三视图比例不一致',preset:'灰模 / 人体比例',composition:['三视图','全身'],style:['产品渲染']},
 {id:'product',icon:'◇',type:'image',name:'产品商业摄影',desc:'主体材质、背景、光线、镜头与商业陈列控制。',tags:['产品','商业','摄影'],subject:'高品质商业产品摄影，主体结构准确，材质真实',negative:'文字乱码、产品形变、错误反射、杂乱背景',preset:'产品摄影',lighting:['柔和棚拍光'],style:['产品渲染']},
 {id:'guoman',icon:'◆',type:'image',name:'3D 国漫角色',desc:'半写实 3D 国漫角色材质、皮肤、发丝与电影光照。',tags:['国漫','3D','角色'],subject:'成年东方角色，高品质3D国漫半写实风格，细腻皮肤Shader，柔和SSS，清晰发丝',negative:'塑料皮肤、过曝、低模感、五官漂移',preset:'动漫 / 国漫',style:['3D 国漫']},
 {id:'storyboard',icon:'🎬',type:'video',name:'电影分镜 / 单镜头视频',desc:'主体动作、摄影机运动、时间变化、声音与结束状态。',tags:['视频','分镜','Camera'],subject:'电影感单镜头场景，主体动作自然且连续',negative:'主体闪烁、面部漂移、肢体突变、无意义镜头抖动',preset:'电影镜头'},
 {id:'i2v',icon:'↗',type:'video',name:'Image-to-Video 运镜',desc:'基于首帧图片，只描述运动变化而不重复重绘外观。',tags:['I2V','运镜','一致性'],subject:'保持输入图人物与场景外观不变，只产生自然运动和摄影机变化',negative:'重新设计人物、换装、背景跳变、身份漂移',preset:'Image-to-Video'},
 {id:'ad-video',icon:'▶',type:'video',name:'产品广告短片',desc:'产品主体、材质高光、镜头轨迹与节奏控制。',tags:['广告','产品','视频'],subject:'高端产品广告短片，产品结构准确，镜头运动干净，材质高光受控',negative:'产品变形、品牌文字乱码、抖动、反射错误',preset:'产品广告'},
 {id:'multi-shot',icon:'▦',type:'video',name:'多镜头分镜',desc:'镜头 01 → 02 → 03 的连续叙事和节奏模板。',tags:['多镜头','叙事','Storyboard'],subject:'同一人物与场景的连续多镜头叙事，角色身份和服装保持一致',negative:'跨镜头身份漂移、场景断裂、服装变化',preset:'多镜头分镜'},
 {id:'3d-char',icon:'🧊',type:'3d',name:'角色 3D 资产',desc:'正交比例、姿态、材质与拓扑要求。',tags:['3D','角色','资产'],subject:'成年角色完整3D资产，比例准确，正交参考明确',negative:'非流形结构、肢体融合、比例异常',preset:'角色模型'},
 {id:'music',icon:'♪',type:'audio',name:'电影配乐',desc:'情绪、速度、乐器、结构和动态范围。',tags:['音乐','配乐','电影'],subject:'电影感配乐，情绪层次清晰，结构完整',negative:'刺耳失真、过度压缩、突然截断',preset:'配乐'},
 {id:'voice',icon:'◖',type:'audio',name:'旁白 / TTS',desc:'角色、语气、语速、停顿与情绪控制。',tags:['旁白','TTS','声音'],subject:'自然清晰的人声旁白，语气稳定，停顿自然',negative:'机械节奏、爆音、底噪',preset:'旁白 / TTS'}
];
const MODELS=[
 ['GPT Image','image','通用图像生成与编辑','自然语言、编辑、构图','OpenAI'],['Gemini Image','image','多模态图像创作','参考图、编辑、文本理解','Google'],['Midjourney','image','风格化视觉创作','审美、概念图、摄影风格','Cloud'],['FLUX','image','图像生成生态','本地/云端、LoRA、工作流','Open'],['SDXL','image','本地扩散模型生态','ControlNet、LoRA、ComfyUI','Local'],['Ideogram','image','设计与文字图像','海报、排版、商业视觉','Cloud'],
 ['Veo','video','视频生成','镜头、动作、声音描述','Google'],['Sora','video','视频生成','场景、运动、镜头','OpenAI'],['Kling','video','图生视频 / 视频生成','人物动作、运镜、首尾帧','Cloud'],['Runway','video','生成与视频创作','Camera、I2V、编辑','Cloud'],['Seedance','video','视频生成','动作、镜头、角色连续性','Cloud'],['Hailuo','video','视频生成','人物、镜头、短视频','Cloud'],['Luma Dream Machine','video','图像与视频生成','I2V、运动','Cloud'],
 ['Text-to-3D','3d','3D 资产生成','Mesh、材质、参考图','Mixed'],['Image-to-3D','3d','图片转3D','单图、多视图、Mesh','Mixed'],
 ['Suno','audio','音乐生成','歌词、风格、结构','Cloud'],['Udio','audio','音乐生成','歌曲、风格、续写','Cloud'],['ElevenLabs','audio','语音与音频','TTS、声音、对白','Cloud']
].map((x,i)=>({id:'m'+i,name:x[0],type:x[1],desc:x[2],abilities:x[3].split('、'),vendor:x[4]}));
const FEATURED=[
 {id:'f1',type:'image',cover:'c1',emoji:'◉',name:'冷调电影人像',desc:'50mm 标准镜头 + 电影侧光 + 低饱和背景',model:'GPT Image',template:'电影感人像摄影',tags:['人像','电影感']},
 {id:'f2',type:'image',cover:'c2',emoji:'▥',name:'人物三视图资产',desc:'正面 / 45° / 侧面连续身份结构',model:'Gemini Image',template:'人物设定 / 三视图',tags:['角色','三视图']},
 {id:'f3',type:'video',cover:'c3',emoji:'🎬',name:'缓慢推镜人物镜头',desc:'Dolly In + 50mm + 微风环境运动',model:'Kling',template:'电影分镜 / 单镜头视频',tags:['视频','Dolly In'],time:'5s'},
 {id:'f4',type:'image',cover:'c4',emoji:'◆',name:'高品质 3D 国漫',desc:'半写实 Shader + SSS + 发丝细节',model:'FLUX',template:'3D 国漫角色',tags:['国漫','角色']},
 {id:'f5',type:'video',cover:'c5',emoji:'▶',name:'产品环绕广告镜头',desc:'Orbit Camera + 材质高光 + 黑色环境',model:'Runway',template:'产品广告短片',tags:['广告','运镜'],time:'8s'},
 {id:'f6',type:'image',cover:'c6',emoji:'♙',name:'人体比例灰模',desc:'无脸、非敏感、正交三视图',model:'SDXL',template:'无脸灰模 / 人体比例',tags:['灰模','比例']},
 {id:'f7',type:'audio',cover:'c7',emoji:'♪',name:'神秘东方配乐',desc:'缓慢弦乐 + 低频氛围 + 空间混响',model:'Suno',template:'电影配乐',tags:['音乐','氛围']},
 {id:'f8',type:'3d',cover:'c8',emoji:'🧊',name:'角色灰模 3D 资产',desc:'正交比例参考 + 中性站姿 + PBR 可选',model:'Text-to-3D',template:'角色 3D 资产',tags:['3D','角色']}
];
const WORKFLOWS=[
 ['角色身份锁定','图片','母版身份 → 45°结构 → 90°结构 → 三视图 → 质量修复',['Reference','Prompt','Generate','Review']],
 ['灰模资产建立','图片','多姿势参考 → 身材特征表 → 无脸灰模 → 三视图资产',['Analyze','Parameters','Graymodel','Save']],
 ['图片转视频','视频','首帧 → 视频 Prompt → Camera Motion → 生成 → 选片',['Image','Motion','Video','Review']],
 ['角色短片','视频','角色母版 → 场景图 → 分镜 → 多镜头视频 → 连续性检查',['Identity','Storyboard','Shots','QC']],
 ['产品广告','视频','产品参考 → Hero Frame → 运镜 → 广告视频 → 输出',['Product','Image','Camera','Video']],
 ['ComfyUI 外部工作流','混合','Prompt Asset → workflow.json → Queue → 保存输出案例',['Prompt','ComfyUI','Output','Asset']]
];
