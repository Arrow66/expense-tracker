
"use client"

import { useState, SyntheticEvent, ChangeEvent, FormEvent, useEffect } from 'react'


interface Values {
    [key: string]: string;
}

interface Errors {
    [key: string]: string;
}

const useForm = (callback: () => void,initialFormState: Values) => {

    const [values, setValues] = useState<Values>(initialFormState);
    const [errors, setErrors] = useState<Errors>({});


    const isValid  = !!(Object.keys(errors).length === 0 && Object.keys(values).length !== 0)
   
    


    const validate = ( name: any, value: string): Record<string, string> => {

        let error: Record<string, string> = {};

        switch (name) {
            case 'email':
                if (!new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)) {
                    error = {
                        email: 'Enter a valid email address'
                    }
                }
                break;
    
            case 'password':
                if (!new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)) {
                    error = {
                        password: 'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
                    }
                }
                break;
                
            case "confirm_password":
                if (!new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)) {
                    error = {
                        "confirm_password": 'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
                    }
                } else if (value !== values.password) {
                    error = {
                        "confirm_password": 'Passwords does not match'
                    }
                }
                break;
                
            case "transaction":
                if (!value || value.trim() === "") {
                    error = {
                        "transaction": 'Required'
                    }
                }
                break;
    
            case "trtype":
                if (!value || value?.trim() === "") {
                    error = {
                        "trtype": 'Required'
                    }
                }
                break;
    
            case "amount":
                if (!value || value.trim() === "") {
                    error = {
                        "amount": 'Required'
                    }
                }
                break;
    
            default:
                break;
        }
        
        return error;
    }

    const handleChange = (event: FormEvent) => {
        event.persist();
        let target = event.target as HTMLInputElement | HTMLSelectElement;
        let name = target.name;
        let val = target.value;
        const error = validate(name, val);
        if (error[name]) {
            setErrors(errors => ({ ...errors, ...error }));
        } else {
            setErrors(errors => {
                const { [name]: _, ...rest } = errors;
                return rest;
            });
        }
    
        setValues({
            ...values,
            [name]: val,
        })

    }

    const reset = ()=>{
        setValues({...initialFormState});
        setErrors({});
    }

    console.log(errors,values)


    const handleSubmit = (event: SyntheticEvent) => {
        
        if (event) event.preventDefault();

        let newErrors = {};
        for (const [key, value] of Object.entries(values)) { 
            const error = validate(key, value);
            if (error[key]) {
                newErrors = { ...newErrors, ...error };
            }
        }
        setErrors(newErrors);
    
        console.log(newErrors);
          
        if (Object.keys(newErrors).length === 0) {
            callback();
        } else {
            console.log("There is an Error!");
        }
    }


    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        reset,
        isValid
    }
}

export default useForm