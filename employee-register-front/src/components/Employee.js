// eslint-disable-next-line
import React, { useState, useEffect } from 'react';

const defaultImageSrc = './img/image_placeholder.png'


// eslint-disable-next-line
const initialFieldValues = {
    employeeID: 0,
    employeeName: '',
    occupation: '',
    imageName: '',
    imageSrc: defaultImageSrc,
    imageFile: null

}

export default function Employee(props) {
    // eslint-disable-next-line
    const { addOrEdit, recordForEdit } = props

    // eslint-disable-next-line
    const [values, setValues] = useState(initialFieldValues)
    const [erros, setErrors] = useState({})


    useEffect(() => {
        if (recordForEdit != null)
            setValues(recordForEdit);
    }, [recordForEdit])

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc
            })
        }
    }

    const validate = () => {
        let temp = {}
        // eslint-disable-next-line
        temp.employeeName = values.employeeName == "" ? false : true;
        // eslint-disable-next-line
        temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
        setErrors(temp)
        // eslint-disable-next-line
        return Object.values(temp).every(x => x == true)
    }

    const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader').value = null;
        setErrors({})
    }


    const handleFormSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData()
            formData.append('employeeID', values.employeeID)
            formData.append('employeeName', values.employeeName)
            formData.append('occupation', values.occupation)
            formData.append('imageName', values.imageName)
            formData.append('imageFile', values.imageFile)
            addOrEdit(formData, resetForm)

        }
    }
    // eslint-disable-next-line
    const applyErrorClass = field => ((field in erros && erros[field] == false) ? ' invalid-field' : '')

    return (
        <>
            <div className="container text-center">
                <p className="lead">An Employee</p>
            </div>

            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card">
                    <img src={values.imageSrc} alt="card-img-top" />
                    <div className="card-body">
                        <div className="form-group">
                            <input type="file" accept="image/*" className={"form-control-file" + applyErrorClass('imageSrc')}
                                onChange={showPreview} id="image-uploader" />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('employeeName')} placeholder="Employee Name" name="employeeName"
                                value={values.employeeName}
                                onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <input className="form-control" placeholder="Occupation" name="occupation"
                                value={values.occupation}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-success btn-block">Register</button>
                        </div>
                    </div>
                </div>
            </form>

        </>
    )
}