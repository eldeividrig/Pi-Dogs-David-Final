import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemperaments, postDog } from "../../redux/actions";
import style from "../AddDog/AddDog.module.css";

const validate = (form) => {
  let errors = {};  
  if (!form.name) {
    errors.name = "El nombre es obligatorio, no debe contener números";
  }
  if (!form.min_height || !form.max_height) {
    errors.height = "Debe ingresar la altura";
  }
  if (!form.min_weight || !form.max_weight) {
    errors.weight = "Debe ingresar el peso";
  }
  if (!form.life_span) {
    errors.life_span =
      "Debe ingresar esperanza de vida, escriba solo numeros separados por un guión";
  }
  return errors;
};

export default function AddDog() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [button, setButton] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_span: "",
    image: "",
  });

  const [form, setForm] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  useEffect(() => {
    if (
      form.name.length > 0 &&
      form.min_height.length > 0 &&
      form.max_height.length > 0 &&
      form.min_weight.length > 0 &&
      form.max_weight.length > 0
    )
      setButton(false);
    else setButton(true);
  }, [form, setButton]);

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleSubmit = (e) => {
    form.name = capitalizarPrimeraLetra(form.name)
    e.preventDefault();
    dispatch(postDog(form));
    alert("El nuevo perro a sido agregado correctamente");
    setForm({
      name: "",
      min_height: "",
      max_height: "",
      min_weight: "",
      max_weight: "",
      life_span: "",
      image: "",
      temperaments: [],
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e) => {
    setForm({
      ...form,
      temperaments: [...form.temperaments, e.target.value],
    });
  };

  const handleDelete = (el) => {
    setForm({
      ...form,
      temperaments: form.temperaments.filter((temp) => temp !== el),
    });
  };

  return (
    <div className={style.main_wrapper}>
      <div className={style.container}>
        <Link to="/home">
          <button className={style.button_to_home}>Ir al Home</button>
        </Link>
        <form
          action=""
          id="form"
          onSubmit={handleSubmit}
          className={`${style.form}`}
        >
          <div className={style.name_container}>
            <input
              className={style.input_name}
              type="text"
              value={form.name}
              name="name"
              onChange={(e) => handleChange(e)}
              placeholder="Nombre Raza"
            />
          </div>
          <div className={style.error_form}>
            {errors.name && <p>{errors.name}</p>}
          </div>

          <div className={style.height_container}>
            <div className={style.min_height}>
              <input
                type="text"
                value={form.min_height}
                name="min_height"
                placeholder="Altura Mínima"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={style.max_height}>
              <input
                type="text"
                value={form.max_height}
                name="max_height"
                placeholder="Altura Máxima"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className={style.error_form}>
            {errors.height && <p>{errors.height}</p>}
          </div>

          <div className={style.weight_container}>
            <div className={style.min_weight}>
              <input
                type="text"
                value={form.min_weight}
                name="min_weight"
                placeholder="Peso Mínimo"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={style.max_weight}>
              <input
                type="text"
                value={form.max_weight}
                name="max_weight"
                placeholder="Peso Máximo"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className={style.error_form}>
            {errors.weight && <p>{errors.weight}</p>}
          </div>

          <div className="life-span-container">
            <input
              type="text"
              autoComplete="off"
              value={form.life_span}
              name="life_span"
              placeholder="Esperanza de vida: 10 - 12"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={style.error_form}>
            {errors.life_span && <p>{errors.name}</p>}
          </div>
          <div className="image-container">
            <input
              type="text"
              autoComplete="off"
              value={form.image}
              name="image"
              placeholder="Agregar URL de la imagen"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <h3>Seleccionar Temperamentos</h3>
          </div>
          <div>
            <select
              className={style.select_temperaments}
              onChange={handleSelect}
            >
              <option value={"default"}>Temperamentos</option>
              {temperaments.map((t) => (
                <option
                  value={t.name}
                  key={t.name + Math.random()}
                  className={style.option_temperament}
                >
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div className={style.container_button_add_dog}>
            <button
              className={style.button_add_dog}
              disabled={button}
              type="submit"
              form="form"
            >
              Crear Raza
            </button>
          </div>
        </form>

        <div>
          <div>
            <h2>Temperamentos</h2>
          </div>
          <div className={style.container_temperaments}>
            {form.temperaments.map((el) => (
              <div
                className={style.element_temperament}
                key={el}
                onClick={() => handleDelete(el)}
              >
                <p>{`${el}`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
