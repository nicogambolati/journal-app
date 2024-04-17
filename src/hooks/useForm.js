import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  // Quiero memorizar el valor
  const isFormValid = useMemo(() => {
    // Verifica si todas las propiedades del objeto formValidation son nulas, con que una sea null sale del ciclo
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) {
        return false;
      }
    }

    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};

    // Barre el arreglo/objeto de validaciones y analizar cada una de sus propiedades
    for (const formField of Object.keys(formValidations)) {
      // console.log(formField);  // imprime el nombre de las propiedades
      const [fn, errorMessage] = formValidations[formField];

      // Crea una propiedad computada para cada una de las propiedades de la validación del formulario
      // y le asigna el resultado de la validación
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidation,
    isFormValid
  };
};
