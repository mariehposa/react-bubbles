import React, { useState } from "react";
import AxiosAuth from '../axios/AxiosAuth'
import { Formik } from 'formik';
import { StyledForm, StyledField, StyledButton } from './Styles';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const initialForm = {
  color: '',
  code: ''
}

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    console.log('edit', colorToEdit)
    e.preventDefault();

    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    AxiosAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
     .then(res => {
      // console.log(res.data);
     const remainingColors = colors.filter(color => color.id !== colorToEdit.id)
      updateColors([...remainingColors, res.data])
     })
     .catch(err => {
      //  console.log(err);
     })
  };

  const deleteColor = color => {
    // console.log('colorList',color);
    // make a delete request to delete this color
    AxiosAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
    .then( res => {
      // console.log(res)
      const remainingColors = colors.filter(clr => color.id !== clr.id)
      updateColors(remainingColors)
      setEditing(false)
    })
    .catch(err => {
      // console.log(err)
    })
  };

  const onAddColor = (formValues, actions) => {
    AxiosAuth().post('http://localhost:5000/api/colors', {
      color: formValues.color,
      code: {hex: formValues.code},
      id: Date.now()
    })
      .then( res => {
        updateColors(res.data)
      })
      .catch( err => {
        alert(err.message)
      })
    actions.resetForm()
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <Formik 
        initialValues={initialForm}
        onSubmit={onAddColor}
        render={props => {
          return (
            <StyledForm>
              <StyledField name="color" placeholder="Enter color" />
              <StyledField name="code" placeholder="Enter code" />
              <StyledButton type="Submit">Add Color</StyledButton>
            </StyledForm>
          );
        }}
      />
    </div>
  );
};

export default ColorList;
