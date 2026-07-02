# Coding Coach Pet Mascot 素材总结（2026-07-02）

本次整理覆盖四类宠物资产：Bluebot、Bytecat、Nono，以及新增的 Wizard reading v3 关键帧。仓库中 Bluebot / Bytecat / Nono 已包含 v7 正式序列包和运行时包；本次追加的是 Wizard reading v3 的稳定关键帧，以及 Nono 新一轮已确认的关键帧预览。

## 状态机

统一使用六个状态：

- `idle`：空闲、等待或无活跃请求。
- `reading`：Agent 正在读取题目、上下文、记忆或计划。
- `running`：Agent 正在运行样例或临时检查。
- `judging`：正式提交已创建，正在等待 Judge 结果。
- `success`：Accepted、命令成功或动作完成。
- `needs-fix`：WA / RE / TLE / SYSTEM_ERROR 或需要继续修改。

## Bluebot

Bluebot 是默认宠物，继续承担稳定基准角色。设计重点是清晰、克制、工程感强，适合作为默认 Agent 状态入口。

已在仓库中：

- `outputs/bluebot-sequence-v7-acting/`
- `outputs/bluebot-sequence-v7-runtime/`

状态表现：

- `idle`：默认稳定待机。
- `reading`：轻量读取/观察。
- `running`：运行中动效。
- `judging`：等待判题/扫描。
- `success`：短促庆祝。
- `needs-fix`：温和提示。

## Bytecat

Bytecat 是独立宠物，不是 Bluebot 换皮。它的动作语言依赖耳朵、尾巴、爪子和身体重心。

已在仓库中：

- `outputs/bytecat-sequence-v7-acting/`
- `outputs/bytecat-sequence-v7-runtime/`
- 汇总预览：`outputs/bytecat-sequence-v7-acting/previews/bytecat-v7-all-states-formal-final-overview.png`

已完成状态：

- `idle`：趴睡，带 `zzz` 睡眠提示。
- `reading`：看书/翻页，移除错误放大镜元素并统一尺寸。
- `running`：抓蝴蝶，俯身动作。
- `judging`：挠头沉思。
- `success`：轻快庆祝。
- `needs-fix`：举牌提示，红色叉号。

## Nono

Nono 是独立科技宠物，不是换皮。它的动作语言依赖悬浮、面屏、投影、扫描、喷射器和全息 HUD。

正式包已在仓库中：

- `outputs/nono-sequence-v7-acting/`
- `outputs/nono-sequence-v7-runtime/`

本次追加的关键帧预览：

- `idle`：`outputs/nono-sequence-v7-acting/previews/image2-idle-sleep-keyframes-v3-native-eyes-clean3/`
- `reading`：`outputs/nono-sequence-v7-acting/previews/image2-reading-hologram-keyframes-v2-round-clean/`
- `running`：`outputs/nono-sequence-v7-acting/previews/image2-running-code-input-keyframes-v1-clean/`
- `judging`：`outputs/nono-sequence-v7-acting/previews/image2-judging-magnifier-eye-keyframes-v1-clean/`
- `needs-fix`：`outputs/nono-sequence-v7-acting/previews/image2-needs-fix-question-keyframes-v1-clean/`
- `success` 参考：`outputs/nono-sequence-v7-acting/previews/nono-success-v7-identity-preserved.gif`

状态表现：

- `idle`：睡眠休息，头部喷射器耷拉，眼睛保持原生短竖条。
- `reading`：原始圆滚滚 Nono，前方出现 cyan 全息投影屏幕。
- `running`：面屏出现抽象输入光标和数据点，喷射器能量增强。
- `judging`：画面右侧眼睛有 cyan 全息放大镜顺时针环绕。
- `success`：转圈跳起，包含合理背面关键帧。
- `needs-fix`：身体侧过来，右上角 cyan 问号气泡，表达温和疑惑。

## Wizard Reading v3

Wizard 是新整理的宠物素材路径，目前重点确认了 `reading` 状态关键帧 v3。

路径：

- `outputs/pets/wizard/previews/reading-keyframes-v3-action-group/`

重点文件：

- `pet_wizard_reading_keyframe_v3_action-preview.gif`
- `pet_wizard_reading_keyframe_v3_action-review-sheet.png`
- `pet_wizard_reading_keyframe_v3_action-dark-audit.png`
- `fitted/` 下 8 张 `512x512` PNG。

版本结论：

- v1：角色整体会抖，废弃。
- v2：身体不抖，但书页像贴片单独动，废弃。
- v3：从 v1 抽取“手 + 前臂 + 书本 + 书页”动作组，固定身体、头、脚和外轮廓，是当前采用版本。

校验结果：

- 8 帧均为 `512x512`。
- bbox 全部固定为 `(148, 50, 364, 460)`。
- 四角 alpha 均为 `0`。
- 强绿残留为 `0`。
- 洋红残留为 `0`。
- 动作遮罩外变化量为 `0`。
- GIF 帧数为 `8`。

## 生产经验

本轮素材生产沉淀出几条稳定规则：

- 先做关键帧预览，用户确认后再落正式序列包。
- 不能把某个状态的姿态当作其他状态基底，例如 Nono 的睡眠 `idle` 不能套到 `reading`。
- 角色外观、比例、脸、轮廓和配色必须优先保持。
- 如果关键帧方向错了，应重做关键帧，不应继续串帧或局部硬修。
- GIF 必须单独检查调色板残留，PNG 干净不代表 GIF 一定干净。
- 对于需要稳定身体的动作，应使用动作遮罩，只允许手、前臂、道具或局部 HUD 变化。

## 后续建议

- Wizard 可以继续按 v3 的动作组思路制作其他状态。
- Nono 当前新关键帧仍属于预览资产；如果要进入正式包，应按批准关键帧扩展为正式帧数并导出多尺寸 WebP。
- Bluebot / Bytecat / Nono 的正式包可以继续作为 viewer 的主要对比对象。
