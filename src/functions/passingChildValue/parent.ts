// this will allow you to set the value in the parent that is captured in the child


const getBrandIdTest = (brandIdTest: string, brandIdTestTwo: string) => {
    setBrandId(brandIdTestTwo);
    console.log(brandId);
  };