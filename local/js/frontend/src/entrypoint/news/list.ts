import { NewList } from "@/modules/news";
import Translations from "@/translations";
import { createApp } from "vue";

// @ts-ignore
BX.namespace("BX.Citrus.Components");

// @ts-ignore
BX.Citrus.Components.NewList = function (props) {
    const app = createApp(NewList, !!props ? props : {});
    app.use(Translations);
    app.mount(`#${props.templateId ?? 'app'}`);
}