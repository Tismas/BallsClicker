import { ballsUpgrades } from "../upgrades/ballsUpgrades";
import { targetUpgrades } from "../upgrades/targetUpgrades";
import { Upgrade } from "../upgrades/Upgrade";

declare global {
  interface Window {
    renderBallsUpgrades: () => void;
    renderTargetUpgrades: () => void;
  }
}

const tabContent = document.getElementById("tab-content");

const createUpgradeButtons = (upgrades: Upgrade[], onApplied: VoidFunction) => {
  const container = document.createElement("div");

  upgrades.map((upgrade) => {
    const button = document.createElement("button");
    button.classList.add("upgrade-button");
    button.innerText = `${upgrade.name} - $${upgrade.cost}`;
    button.onclick = () => {
      const applied = upgrade.apply();
      if (applied) onApplied();
    };

    container.appendChild(button);
  });

  return container;
};

const renderTargetUpgrades = () => {
  if (!tabContent) throw new Error("Tab content not found");

  tabContent.replaceChildren(
    createUpgradeButtons(targetUpgrades, renderTargetUpgrades)
  );
};

const renderBallsUpgrades = () => {
  if (!tabContent) throw new Error("Tab content not found");

  tabContent.replaceChildren(
    createUpgradeButtons(ballsUpgrades, renderBallsUpgrades)
  );
};

export const setupUi = () => {
  window.renderTargetUpgrades = renderTargetUpgrades;
  window.renderBallsUpgrades = renderBallsUpgrades;

  renderTargetUpgrades();
};
