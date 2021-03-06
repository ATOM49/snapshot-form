import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFormItems, addFormItem, removeFormItem } from './formSlice';
import withSnapshot from '../snapshot/Snapshot';
import uuidv4 from 'uuid/v4';
import styles from './Form.module.css';

export const FormItemTypes = ['radio', 'checkbox'];

const Form = ({ updateSnapshot, snapshot, ...props }) => {
  const formItems = useSelector(selectFormItems);
  const dispatch = useDispatch();

  const isChecked = formItem => {
    return formItem.type === 'radio'
      ? formItem.value === snapshot['radio']
      : snapshot['checkbox'].indexOf(formItem.value) > -1;
  };

  const addNewFormItem = type =>
    dispatch(
      addFormItem({
        id: uuidv4(),
        type: type,
        value: Math.random().toString(36).substring(7)
      })
    );

  return (
    <div>
      <div className={styles.actions}>
        {FormItemTypes.map((
          formItemType // create a generic button to add formItem in the formSlice
        ) => (
          <button onClick={() => addNewFormItem(formItemType)}>
            Add {formItemType} item
          </button>
        ))}
      </div>
      {formItems.map(formItem => {
        return (
          <div className={styles.item} key={uuidv4()}>
            <div className={styles.info}>
              <input
                className={styles.input}
                type={formItem.type}
                id={formItem.id}
                checked={isChecked(formItem)}
                onChange={e => dispatch(updateSnapshot(formItem))}
              />
              <label className={styles.label}>{formItem.value}</label>
            </div>
            <button onClick={() => dispatch(removeFormItem(formItem))}>
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default withSnapshot(Form);
