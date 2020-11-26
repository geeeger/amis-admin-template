import * as React from 'react';
import { Provider } from "mobx-react";
import {
    toast,
    alert,
    confirm
} from 'amis';
import axios from 'axios';
import { MainStore } from './store/index';
import * as copy from 'copy-to-clipboard';
import RootRoute from './route/index';

// css
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'amis/lib/themes/default.css';
import 'amis-editor/dist/style.css';
import './scss/style.scss';

export default function(): JSX.Element {
    const store = ((window as any).store = MainStore.create(
        {},
        {
            fetcher: ({url, method, data, config}: any) => {
                config = config || {};
                config.headers = config.headers || {};
                config.withCredentials = true;

                if (method !== 'post' && method !== 'put' && method !== 'patch') {
                    if (data) {
                        config.params = data;
                    }
                    return (axios as any)[method](url, config);
                } else if (data && data instanceof FormData) {
                    // config.headers = config.headers || {};
                    // config.headers['Content-Type'] = 'multipart/form-data';
                } else if (
                    data &&
                    typeof data !== 'string' &&
                    !(data instanceof Blob) &&
                    !(data instanceof ArrayBuffer)
                ) {
                    data = JSON.stringify(data);
                    config.headers['Content-Type'] = 'application/json';
                }

                return (axios as any)[method](url, data, config);
            },
            isCancel: (e: any) => axios.isCancel(e),
            notify: (type: 'success' | 'error' | 'info', msg: string) => {
                toast[type]
                    ? toast[type](msg, type === 'error' ? '系统错误' : '系统消息')
                    : console.warn('[Notify]', type, msg);
                console.log('[notify]', type, msg);
            },
            alert,
            confirm,
            copy: (contents: string, options: any = {}) => {
                const ret = copy(contents, options);
                ret && (!options || options.shutup !== true) && toast.info('内容已拷贝到剪切板');
                return ret;
            }
        }
    ));

    return (
        <Provider store={store}>
            <RootRoute store={store} />
        </Provider>
    );
}
