import { useUrlSearchParams } from '@vueuse/core';

export function useListControlModel() {

    const listControlModel = reactive<any>({
        pageIndex: 1,
        pageSize: 20,
    });

    const params = useUrlSearchParams('history', {
        initialValue: listControlModel,
    });

    watch(listControlModel, (model) => {
        const schemaChanged = Object.keys(model).some((k) => {
            return model[k] !== params[k] && k !== 'pageIndex';
        });
        Object.assign(params, model);
        if (schemaChanged) {
            model.pageIndex = 1;
            params.pageIndex = 1;
        }
    });

    function clear() {
        Object.keys(listControlModel).forEach(key => delete listControlModel[key]);
        listControlModel.pageIndex = 1;
        listControlModel.pageSize = 20;
    }

    onBeforeMount(() => {
        const numberFields = ['progress', 'pageIndex', 'pageSize', 'status'];
        Object.keys(params).forEach((key) => {
            if (listControlModel[key] === params[key]) return;
            listControlModel[key] = numberFields.includes(key) ? Number(params[key]) : params[key];
        });
    });

    return {
        model: listControlModel, params, clear,
    };
}
