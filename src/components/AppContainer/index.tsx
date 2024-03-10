import { useState } from "react";
import ThemeInjector from "../ThemeInjector";
import styles from "./styles.module.css";
import clsx from "clsx";
import PlusIcon from "../../assets/icons/solid/plus.svg";
import DownloadIcon from "../../assets/icons/solid/download.svg";
import XmarkIcon from "../../assets/icons/solid/xmark.svg";

function prefersDark() {
  // return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function AppContainer() {
  const [theme] = useState(() => {
    return prefersDark() ? "dark" : "vivaldi";
  });
  return (
    <>
      <ThemeInjector incognito={false} selectedTheme={theme} />
      <div
        className={clsx(
          prefersDark() ? styles.dark : styles.light,
          styles.wrapper
        )}
      >
        <div styleName="content">
          <div styleName="descriptionWrapper">
            <div styleName="logoWrapper">
              <img src="/app_icons/icon.svg" alt="TreeTabs" />
              <div>
                <div styleName="logo">
                  <span styleName="partOne">Tree</span>
                  <span styleName="partTwo">Tabs</span>
                </div>
                <div styleName="logoSub">
                  For <span styleName="vivaldi">Vivaldi</span>
                </div>
              </div>
            </div>
            <div>
              <p>
                A new way to experience <b>tab management</b>.
              </p>
              <p>
                Built for Vivaldi, making this extension <b>blend in</b> with
                the browser.
              </p>
              <p>
                With support of all Vivaldi <b>themes</b>, and even custom ones.
              </p>
            </div>
            <a
              styleName="download"
              href="https://github.com/lunavod/TreeTabs/releases"
              target="_blank"
            >
              <DownloadIcon />
              Download
            </a>
          </div>
          <div>
            <div styleName="tabs">
              <Tab
                icon="https://vivaldi.com/wp-content/uploads/cropped-favicon-32x32.png"
                title="Vivaldi Browser | Powerful, Personal and Private web browser"
              />
              <Tab
                icon="https://vivaldi.com/wp-content/uploads/cropped-favicon-32x32.png"
                title="Vivaldi Mail - An email client built into your browser"
                level={2}
              />
              <Tab
                icon="https://vivaldi.com/wp-content/uploads/cropped-favicon-32x32.png"
                title="Browser Blog by Vivaldi - News, Guides & Vivaldi Tips"
                active
                level={2}
              />
              <Tab
                icon="https://vivaldi.net/wp-content/themes/home/favicon-16x16.png"
                title="Vivaldi community | Tech forum and blogging platform."
              />
              <Tab
                icon="https://vivaldi.net/wp-content/themes/home/favicon-16x16.png"
                title="Home | Vivaldi Forum"
                level={2}
              />
              <Tab
                icon="https://vivaldi.net/wp-content/themes/home/favicon-16x16.png"
                title="Desktop | Vivaldi Forum"
                level={3}
              />
              <Tab
                icon="https://vivaldi.net/wp-content/themes/home/favicon-16x16.png"
                title="Customizations & Extensions | Vivaldi Forum"
                level={4}
              />
              <Tab
                icon="https://vivaldi.net/wp-content/themes/home/favicon-16x16.png"
                title="Community & Services | Vivaldi Forum"
                level={3}
              />
              <Tab icon="/app_icons/icon.svg" title={document.title} />
              <div styleName="tab transparent">
                <span styleName="add">
                  <PlusIcon />
                </span>
                <span>Open a New Tab</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <TabsApp /> */}
    </>
  );
}

function Tab({
  icon,
  title,
  active = false,
  level = 1,
}: {
  icon: string;
  title: string;
  active?: boolean;
  level?: number;
}) {
  const padding = (level - 1) * 12;
  return (
    <div
      className={clsx(styles.tab, active && styles.active)}
      style={{ marginLeft: `${padding}px` }}
    >
      <img src={icon} />
      <span styleName="title">{title}</span>
      <div styleName="close">
        <XmarkIcon />
      </div>
    </div>
  );
}

export default AppContainer;
