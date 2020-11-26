import {schema2component} from './AMISRenderer';

export default schema2component(
    {
        type: 'dialog',
        title: '新增页面',
        body: {
            type: 'form',
            controls: [
                {
                    type: "select",
                    label: "选项",
                    name: "select",
                    source: "/api/schema/list",
                    require: true
                }
            ]
        }
    },
    ({onConfirm, ...rest}: any) => {
        return {
            ...rest,
            onConfirm: (values: Array<any>) => onConfirm && onConfirm(values[0])
        };
    }
);
