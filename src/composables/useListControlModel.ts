// import { useUrlSearchParams } from '@vueuse/core';

export function useListControlModel(opt?: { initialModel?: any; numberFields?: string[] }) {
    const listControlModel = reactive<any>(
        opt?.initialModel || {
            pageIndex: 1,
            pageSize: 10,
        }
    );

    // const params = useUrlSearchParams('history', {
    //     initialValue: listControlModel,
    // });

    watch(listControlModel, (newModel, oldModel) => {
        const schemaChanged = Object.keys(newModel).some((k) => {
            return newModel[k] !== oldModel[k] && k !== 'pageIndex';
        });
        // Object.assign(params, model);
        console.log(newModel, schemaChanged);
        if (schemaChanged) {
            newModel.pageIndex = 1;
            // params.pageIndex = 1;
        }
    });

    function clear() {
        Object.keys(listControlModel).forEach((key) => (listControlModel[key] = undefined));
        listControlModel.pageIndex = 1;
        listControlModel.pageSize = 10;
    }

    // onBeforeMount(() => {
    //     const numberFields = ['pageIndex', 'pageSize', ...(opt?.numberFields || [])];
    //     Object.keys(params).forEach((key) => {
    //         if (listControlModel[key] === params[key]) return;
    //         listControlModel[key] = numberFields.includes(key) ? Number(params[key]) : params[key];
    //     });
    // });

    return {
        model: listControlModel,
        // params,
        clear,
    };
}
