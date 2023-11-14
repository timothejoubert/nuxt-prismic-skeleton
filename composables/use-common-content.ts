import type { SettingsDocument, MenuDocument } from "~/prismicio-types";

export type MenuUid = "main-menu" | "footer-menu";
export type CommonContentMenus = { [key in MenuUid]: MenuDocument };

export interface CommonContent {
    menus: CommonContentMenus;
    setting: SettingsDocument;
}

export function useCommonContent() {
    const commonContent = useNuxtData<CommonContent>("common_content").data;

    const menus = commonContent.value?.menus;
    const setting = commonContent.value?.setting;

    function getMenu(id: MenuUid) {
        return commonContent.value?.menus?.[id];
    }

    return {
        menus,
        setting,
        mainMenu: getMenu("main-menu"),
        footerMenu: getMenu("footer-menu"),
    };
}
