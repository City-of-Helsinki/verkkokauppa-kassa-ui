import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

interface UseSearchParamProps {
    parameter: string,
    setValue: (value: any) => {}
}

export const getSearchParam = (parameter = '', location = window.location) => {
    const params = new URLSearchParams(location.search);
    return params.get(parameter) || '';
};

export const useSearchParam = (props: UseSearchParamProps) => {
    const location = useLocation();
    const {parameter, setValue} = props;
    const value = getSearchParam(parameter, location);

    useEffect(() => {
        setValue(value);
    }, [setValue, value]);
};
