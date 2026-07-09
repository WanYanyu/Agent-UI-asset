# Agent UI Asset

Coding Coach / Agent UI 宠物素材仓库，包含三套 v7 独立表演体系宠物序列帧、运行时资源包、manifest schema、QA 报告，以及本地可视化预览工具。

## 仓库内容

- `outputs/bluebot-sequence-v7-acting/`：Bluebot v7 完整素材包。
- `outputs/bytecat-sequence-v7-acting/`：Bytecat v7 完整素材包。
- `outputs/nono-sequence-v7-acting/`：Nono v7 完整素材包。
- `outputs/wizard-sequence-v6-full-frame-acting-v6-1/`：小洛克 Wizard 部分素材包，当前仅包含 `idle`、`reading`、`judging`、`success`；`running` 和 `needs-fix` 尚未正式导出。
- `outputs/pets/wizard/previews/reading-keyframes-v3-action-group/`：Wizard reading v3 稳定关键帧预览。
- `outputs/*-sequence-v7-runtime/`：v7 前端运行时轻量包，只包含 `128`、`96`、`64` 三种 WebP 尺寸。
- `outputs/*-sequence-v6-1-*`：v6.1 历史素材包，保留用于对比和回退。
- `outputs/pet-sequence-manifest.schema.json`：宠物序列 manifest schema。
- `outputs/pet-v7-qa-report.json`：v7 生成后的结构、尺寸、安全区和同步检查报告。
- `outputs/coding-coach-pet-v7-acting-spec.md`：v7 表演体系设计文档。
- `outputs/coding-coach-pet-v7-acting-profiles.json`：v7 表演体系的机器可读配置。
- `outputs/coding-coach-pet-mascot-summary-2026-07-02.zh-CN.md`：Bluebot、Bytecat、Nono、Wizard 当前素材总结。
- `viewer/`：本地预览器，用于查看序列帧播放和 v7 表演体系对比。

## 宠物定位

v7 三只宠物不是简单换皮关系：

- **Bluebot**：默认宠物，稳定、工程感、低打扰，适合作为 Agent 默认状态入口。
- **Bytecat**：新的个性宠物，动作由耳朵、尾巴、爪子和身体重心驱动，更像敏捷的学习伙伴。
- **Nono**：新的个性宠物，动作由悬浮、投影、扫描环、侧翼和核心灯驱动，更像小型轨道扫描器。
- **Wizard / 小洛克**：向导男孩宠物，目前是部分素材包，需等 `running` 与 `needs-fix` 通过后再视为完整可上线包。

另外，本仓库新增 **Wizard** 的 reading v3 关键帧预览。Wizard 当前重点是解决阅读状态的局部动作稳定性：固定身体、头、脚和外轮廓，只让“手 + 前臂 + 书本 + 书页”动作组变化。

六个状态保持一致：

- `idle`：空闲或等待。
- `reading`：Agent 正在读取题目、上下文、记忆或计划。
- `running`：Agent 正在运行样例或临时检查。
- `judging`：正式提交已创建，正在等待 Judge 结果。
- `success`：Accepted、命令成功或 Agent 动作完成。
- `needs-fix`：Wrong Answer、Runtime Error、Time Limit Exceeded、System Error 或命令失败。

## 本地预览

在仓库根目录运行：

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

然后打开：

- 序列帧预览器：`http://127.0.0.1:8765/viewer/index.html`
- v7 表演体系对比：`http://127.0.0.1:8765/viewer/v7-acting.html`

## 资源包说明

完整素材包包含：

- `512/`：源 PNG 序列帧。
- `256/`、`128/`、`96/`、`64/`：WebP 导出帧。
- `previews/`：GIF 和 sample sheet 预览。
- `manifest.json`：状态机、帧数、路径模板、运行时策略和同步转场信息。

运行时轻量包包含：

- `128/`
- `96/`
- `64/`
- `manifest.json`

前端集成时优先使用运行时轻量包；完整素材包更适合审核、再导出和视觉检查。

## 设计约束

- 图片必须是透明背景。
- 重要像素应留在 512 画布中央 80% 安全区内。
- 不允许出现文字、Logo、代码截图、UI 截图、水印、隐藏用例暗示或正确性保证符号。
- `needs-fix` 必须是支持性提示，不能表现为责备、嘲讽或失败羞辱。
- `judging` 只能表达“等待系统返回结果”，不能暗示宠物提前知道答案。

## v7 方向

v7 已生成实际序列帧和运行时包，重点是让三只宠物拥有不同表演体系：

- Bluebot 保持默认基准，动作克制、清晰、稳定。
- Bytecat 用耳朵、尾巴和爪子建立独立动作语言。
- Nono 用投影、扫描和悬浮建立独立动作语言。

完整规格见：

- [v7 Acting Spec](outputs/coding-coach-pet-v7-acting-spec.md)
- [v7 Acting Profiles JSON](outputs/coding-coach-pet-v7-acting-profiles.json)
- [v7 QA Report](outputs/pet-v7-qa-report.json)
- [2026-07-02 Mascot Summary](outputs/coding-coach-pet-mascot-summary-2026-07-02.zh-CN.md)

## GitHub Pages

仓库包含 `.nojekyll`，如果启用 GitHub Pages，可以直接访问 `viewer/` 下的静态页面。
