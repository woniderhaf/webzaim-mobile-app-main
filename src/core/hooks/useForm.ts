import { useState } from 'react';
import { IFormData, IFormDataError, IFormValidator } from '..';

const useForm = (initState: IFormData, onSubmit: (data: IFormData) => void) => {
    const [data, setData] = useState<IFormData>(initState);
    const [dirty, setDirty] = useState(false);

    const onFormSubmit = () => {
        try {
            const errors = validate();

            if (errors.length) {
                errors.forEach(error => {
                    setError(error.name, error.error);
                });
            } else {
                onSubmit(data);
                setDirty(false);
            }
        } catch {
            //
        }
    };

    const validate = (): Array<IFormDataError> => {
        const errors: IFormDataError[] = [];

        Object.keys(data).forEach(key => {
            for (const validator of data[key].validators) {
                let error = validator(data[key].value, data);

                if (
                    (typeof error === 'object' && Object.keys(error).length > 0) ||
                    (typeof error === 'string' && error)
                ) {
                    errors.push({ name: key, error });

                    break;
                }
            }
        });

        return errors;
    };

    const setError = (key: string, error: string | Record<string, string>) => {
        setData(prevData => ({
            ...prevData,
            [key]: {
                ...prevData[key],
                error
            }
        }));
    };

    const setValidators = (key: string, validators: Array<IFormValidator>) => {
        setData(prevData => ({
            ...prevData,
            [key]: {
                ...prevData[key],
                validators
            }
        }));
    };

    const onChange = (key: string, value: any) => {
        setData(prevData => ({
            ...prevData,
            [key]: {
                ...prevData[key],
                error: '',
                value
            }
        }));

        setDirty(true);
    };

    return [data, onChange, onFormSubmit, setError, setValidators, dirty, setDirty] as const;
};

export default useForm;
