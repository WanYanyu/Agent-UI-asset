# Agent UI Asset

Coding Coach / Agent UI 宠物素材仓库。当前仓库只保留前端运行时资源包、manifest，以及可重新导出的 512 PNG 源帧。

## 仓库内容

- `outputs/bluebot-sequence-v6-1-runtime/`：Bluebot 运行时 WebP 包。
- `outputs/bytecat-sequence-v6-1-runtime/`：Bytecat 运行时 WebP 包。
- `outputs/nono-sequence-v6-1-runtime/`：Nono 运行时 WebP 包。
- `outputs/wizard-sequence-v6-1-runtime/`：小洛克 Wizard 部分运行时 WebP 包。
- `outputs/*-sequence-v6-full-frame-acting-v6-1/`：512 PNG 源帧包，仅包含 `manifest.json` 和 `512/`。
- `outputs/pet-sequence-manifest.schema.json`：宠物序列 manifest schema。
- `viewer/`：本地预览器，可查看 runtime 和 source PNG 包。

## 资源包结构

前端集成优先使用运行时包：

```text
outputs/<skin>-sequence-v6-1-runtime/
  manifest.json
  128/
  96/
  64/
```

源帧包只用于审核、重新导出和后续素材生产：

```text
outputs/<skin>-sequence-v6-full-frame-acting-v6-1/
  manifest.json
  512/
```

小洛克 Wizard 目前仍是部分素材包：已导出 `idle`、`reading`、`judging`、`success`；`running` 和 `needs-fix` 在 manifest 中标记为 unavailable。

## 状态说明

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

## 设计约束

- 图片必须是透明背景。
- 重要像素应留在 512 画布中央 80% 安全区内。
- 不允许出现文字、Logo、代码截图、UI 截图、水印、隐藏用例暗示或正确性保证符号。
- `needs-fix` 必须是支持性提示，不能表现为责备、嘲讽或失败羞辱。
- `judging` 只能表达“等待系统返回结果”，不能暗示宠物提前知道答案。
