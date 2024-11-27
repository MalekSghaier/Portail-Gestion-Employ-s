import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, InputBase } from '@mui/material'
import { useNavigate } from 'react-router-dom';


const validationSchema = yup.object({
    search: yup
        .string('Saisissez votre requête de recherche')
        .required('Ce champ ne peut pas être vide'),
});

const SearchInputEl = () => {

    const navigate = useNavigate();

    const onSubmit = (values, actions) => {
        //alert(values.search);
        const { search } = values;
        if (search.trim()) {
            navigate(`/search/${search}`);
        } else {
            navigate('/');
        }
        actions.resetForm();
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            search: '',
        },

        validationSchema: validationSchema,
        onSubmit
    });

    return (

        <form onSubmit={handleSubmit} style={{ width: '50%' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                {/* <Search> */}

                <InputBase sx={{ bgcolor: 'white', padding: '10px' }}
                    fullWidth={true}
                    id="search"
                    name="search"
                    label="search"
                    placeholder='ex: plombier, mécanicien'
                    value={values.search}
                    onChange={handleChange}
                    error={touched.search && Boolean(errors.search)}
                // helperText={touched.search && errors.search}
                />

                <Button color="primary" variant="contained" type="submit" disabled={isSubmitting}>
                    Rechercher
                </Button>
            </Box>
            <Box component='span' sx={{ color: 'orange' }}>{touched.search && errors.search}</Box>
        </form>

    );
};

export default SearchInputEl;