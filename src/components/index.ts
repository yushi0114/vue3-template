import * as iconCollection from '@element-plus/icons-vue';
import type { App } from 'vue';

export { default as Board } from './Board.vue';
export { default as Layout } from './Layout.vue';
export { default as Button } from './Button.vue';
export { default as Switch } from './Switch.vue';
export { default as Checkbox } from './Checkbox.vue';
export { default as Label } from './Label.vue';
export { default as Text } from './Text.vue';
export { default as Nav } from './Nav.vue';
export { default as PagePanel } from './PagePanel.vue';
export { default as SelectTree } from './SelectTree.vue';
export { default as Title } from './Title.vue';
export { default as Panel } from './Panel.vue';
export * from './sidebar';
import SjsForm from './form/index.vue';
import SjcTable from './table/index.vue';

export function registerElementIcons(app: App) {
    Object.keys(iconCollection).forEach((iconName: string) => {
        const icon = iconCollection[iconName as keyof typeof iconCollection];
        console.log(icon);
        app.component(icon.name, icon);
    });
}

type IKeys = keyof typeof components;
// 注册公共组件
const components = { SjsForm, SjcTable };

const withInstall = (app: App<Element>) => {
    Object.keys(components).forEach((key: any) => {
        const component = components[key as IKeys];
        component.install = function(Vue: App<Element>) {
            Vue.component(component.name, component);
        };
        app.use(component as any);
    });
};

export default withInstall;
