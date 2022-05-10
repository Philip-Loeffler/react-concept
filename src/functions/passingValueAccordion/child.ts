import {useState} from 'react';

import {images} from '../../assets/images';
import {icons} from '../../assets/icons';
import {BrandByCardNumber} from '../../models/BrandByCardNumber';

import * as Styled from './styles';

export interface IAddCardAccordion {
  open?: boolean;
  brands?: BrandByCardNumber[];
  setFieldValue: (name: string, value: string) => void;
}

// eslint-disable-next-line no-empty-pattern
const AddCardAccordion: React.FC<IAddCardAccordion> = ({
  brands,
  setFieldValue,
}) => {
  const [cardPreview, setCardPreview] = useState(images.cardMorePrepaid);
  const [openAccordion, setOpenAccordion] = useState(false);

  const triggerClick = () => {
    setOpenAccordion(!openAccordion);
  };

  // selected Item is taking in a brandData, which is of type BrandByCardNumber
  // we are able to pass it that data from the loop down below
  //because that data is being exposed, all we have to do it create a state passing in the
  //card img, and when you click on a specific accordion drop down, it knows which one you have 
  // selected...because of the loop
  const selectedItem = (brandData: BrandByCardNumber) => {
    setCardPreview(brandData.cardImageUrl);
    //here we have a function as a prop. the function declaration says it take in
    //a name which is a string, and a value which is a string. 
    setFieldValue('brandId', brandData.id);
  
  };

  return (
    <Styled.Container>
      <Styled.AccordionWrapper>
        <Styled.Row>
        // this is what sets the card img, and is changed thanks to the selectedItem function
          <Styled.CardIcon src={cardPreview} alt="more card icon" />

          <Styled.AccordionTitle>Region Selection</Styled.AccordionTitle>

          <Styled.Button
            onClick={(e) => {
              e.preventDefault();
              triggerClick();
            }}>
            {openAccordion ? (
              <Styled.SaveIcon src={icons.saveIcon} alt="accordion edit icon" />
            ) : (
              <Styled.EditIcon
                src={icons.accordionEdit}
                alt="accordion save icon"
              />
            )}
          </Styled.Button>
        </Styled.Row>
        <Styled.AccordionDropDown open={openAccordion}>
        // this loop is what allows us to set the card value depending on what we select
          {brands?.map((brandData, index) => (
            <Styled.AccordionSelection>
              <Styled.AccordionOptions onClick={() => selectedItem(brandData)}>
                {brandData.regionName}
              </Styled.AccordionOptions>
            </Styled.AccordionSelection>
          ))}
        </Styled.AccordionDropDown>
      </Styled.AccordionWrapper>
    </Styled.Container>
  );
};

export default AddCardAccordion;
