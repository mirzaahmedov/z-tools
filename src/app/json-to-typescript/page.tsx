"use client";

import { Button, Modal, Splitter, Typography, message } from "antd";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import {
  CodeOutlined,
  CopyOutlined,
  ExpandOutlined,
  FileTextOutlined,
  ShrinkOutlined,
} from "@ant-design/icons";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { useEffect, useMemo, useState } from "react";

import JSONToTs from "json-to-ts";
import { LoadTextFile } from "@/components/LoadTextFile";
import { Maximizer } from "@/components/Maximizer";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { useSettingsStore } from "@/features/settings/store";
import { useThemeStore } from "@/features/theme/store";
import { useToggle } from "@/hooks/use-toggle";
import { useWindowSize } from "react-use";

const { Panel } = Splitter;
const { Title } = Typography;

const JSONToTypescriptPage = () => {
  const fileToggle = useToggle();
  const fontSize = useSettingsStore((store) => store.fontSize);
  const theme = useThemeStore((store) => store.theme);
  const windowSize = useWindowSize();
  const themeExtension = theme === "dark" ? githubDark : githubLight;

  const [jsonText, setJsonText] = useState("{}");
  const [tsCode, setTsCode] = useState("");

  const settingExtension = useMemo(
    () =>
      EditorView.theme({
        "&": {
          fontSize: `${fontSize}px`,
        },
      }),
    [fontSize]
  );
  const jsonExtensions = useMemo(
    () => [json(), settingExtension],
    [settingExtension]
  );
  const tsExtensions = useMemo(
    () => [javascript({ typescript: true }), settingExtension],
    [settingExtension]
  );

  useEffect(() => {
    try {
      setTsCode(JSONToTs(JSON.parse(jsonText)).join("\n"));
    } catch (error) {
      // message.error("Invalid JSON");
      console.log(error);
    }
  }, [jsonText]);

  return (
    <>
      <Splitter
        layout={windowSize.width < 800 ? "vertical" : "horizontal"}
        className="bg-gh-border"
      >
        <Panel>
          <Maximizer>
            {({ ref, isMaximized, toggleMaximize }) => (
              <div
                ref={ref}
                className="h-full flex flex-col overflow-hidden divide-y divide-gh-border bg-gh-code-bg"
              >
                <div className="flex items-center gap-2 px-5 py-1">
                  <Title
                    level={5}
                    className="flex-1 text-sm font-bold uppercase mb-0"
                  >
                    <CodeOutlined /> json
                  </Title>
                  <Button variant="outlined" onClick={fileToggle.toggle}>
                    <FileTextOutlined /> Read From File
                  </Button>
                  <Button
                    variant="outlined"
                    icon={<CopyOutlined />}
                    onClick={() => {
                      navigator.clipboard.writeText(jsonText).then(() => {
                        message.success("Copied to clipboard");
                      });
                    }}
                    className="block"
                  ></Button>
                  <Button
                    variant="outlined"
                    icon={isMaximized ? <ShrinkOutlined /> : <ExpandOutlined />}
                    onClick={toggleMaximize}
                    className="block"
                  ></Button>
                </div>
                <div className="flex-1 min-h-0">
                  <CodeMirror
                    theme={themeExtension}
                    value={jsonText}
                    onChange={setJsonText}
                    extensions={jsonExtensions}
                    className="editor"
                  />
                </div>
              </div>
            )}
          </Maximizer>
        </Panel>
        <Panel>
          <Maximizer>
            {({ ref, isMaximized, toggleMaximize }) => (
              <div
                ref={ref}
                className="h-full flex flex-col overflow-hidden divide-y divide-gh-border bg-gh-code-bg"
              >
                <div className="flex items-center gap-2 px-5 py-1">
                  <Title
                    level={5}
                    className="flex-1 text-sm font-bold uppercase mb-0"
                  >
                    <CodeOutlined /> Typescript
                  </Title>
                  <Button
                    variant="outlined"
                    icon={<CopyOutlined />}
                    onClick={() => {
                      navigator.clipboard.writeText(tsCode).then(() => {
                        message.success("Copied to clipboard");
                      });
                    }}
                    className="block"
                  ></Button>
                  <Button
                    variant="outlined"
                    icon={isMaximized ? <ShrinkOutlined /> : <ExpandOutlined />}
                    onClick={toggleMaximize}
                    className="block"
                  ></Button>
                </div>
                <div className="flex-1 min-h-0">
                  <CodeMirror
                    theme={themeExtension}
                    readOnly
                    value={tsCode}
                    extensions={tsExtensions}
                    className="editor"
                  />
                </div>
              </div>
            )}
          </Maximizer>
        </Panel>
      </Splitter>
      <Modal open={fileToggle.state} onCancel={fileToggle.close}>
        <LoadTextFile
          onFileLoaded={(data) => {
            setJsonText(data);
            fileToggle.close();
          }}
        />
      </Modal>
    </>
  );
};

export default JSONToTypescriptPage;
