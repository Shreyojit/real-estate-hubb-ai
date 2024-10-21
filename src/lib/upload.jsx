const handleImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFile(file);
}

const TransformFile = (file) => {
    const reader = new FileReader();

    if(file){
        reader.readAsDataURL(file);
        reader.onloadend = {} => {
            setImage(reader.result);

        };
        else{
            setImage("");
        }
    }
}

import React from 'react'

export default function upload() {
  return (
    <div>
      image ? (<img src={productImage} alt=""/>): <p>No Image to show</p>
    </div>
  )
}
