import { useState } from "react";
import ThemeInjector from "../ThemeInjector";
import clsx from "clsx";
import styles from "./styles.module.css";

function prefersDark() {
  // return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function AfterInstallPage() {
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
          <h1>
            Nice,{" "}
            <div styleName="logo">
              <span styleName="partOne">Tree</span>
              <span styleName="partTwo">Tabs</span>
            </div>{" "}
            installed!
          </h1>
          <h2>What now?</h2>
          <ol>
            <li>
              Copy url:{" "}
              <code>https://tree-tabs-front.vercel.app/container</code>
              <div styleName="small">
                That website is just a container for the extension - we can't
                use bundled html file, because it won't open in incognito mode.
                <br />
                Website itself does not contain any scripts that would work with
                your tabs, it's just a container for the extensions's content
                script.
                <br />
                That page uses client-side caching, so it should open even if
                you're offline.
              </div>
            </li>
            <li>Press "+" button on the side panel and paste the address</li>
            <li>
              Click on the extension icon in the extensions bar, there you can
              change themes and settings!
            </li>
            <li>
              <span styleName="optional">(Optional)</span> To hide panel title,
              right-click near the home button on the panel, select "Navigation
              Controls" -{">"} "Hide"
            </li>
            <li>
              <span styleName="optional">(Optional)</span> To allow extension to
              work in incognito mode, find the extension in the extensions list,
              click on "Details", and enable "Allow in incognito".
              <br />
              After that, right-click on the extension panel, and press
              "reload". Or restart the browser.
            </li>
            <li>
              <span styleName="optional">(Optional)</span> Hide native browser
              tab bar: open settings, go to "Tabs", and uncheck "Show Tab Bar"
              option
            </li>
            <li>
              <span styleName="optional">(Optional)</span> Disable ad blocking
              for this domain - click on the shield icon in the address bar, and
              select "No Blocking"
              <div styleName="small">
                With blocking enabled, some favicons might not load, for example
                from reddit.com
                <br />
                This website does not contain any ads or trackers, so it's safe
                to disable blocking here.
              </div>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}

export default AfterInstallPage;
