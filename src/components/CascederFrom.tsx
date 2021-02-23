import React, { FC, useEffect, useState } from 'react';
import { Cascader } from 'antd';
import { CascaderOptionType } from 'antd/lib/cascader';
import { useDispatch, useSelector } from 'react-redux';
import {
  categoryService,
  FetchCategoriesAsync,
  isError,
  RootState,
} from '@core';
import useTranslation from 'next-translate/useTranslation';

interface props {
  value?: any;
  onChange?: (val: any) => void;
}

const CascederForm: FC<props> = ({ onChange, value }) => {
  const [options, setOptions] = useState<CascaderOptionType[]>();
  const { parents } = useSelector((state: RootState) => state.Category);
  const { lang } = useTranslation();
  const en = lang === 'en';
  const dispatch = useDispatch();

  useEffect(() => {
    parents &&
      parents.length !== 0 &&
      setOptions(
        parents.map((el) => ({
          label: en ? el['name:en'] : el['name:ar'],
          value: el.id,
          isLeaf: false,
        }))
      );
  }, [parents]);

  useEffect(() => {
    dispatch(FetchCategoriesAsync());
  }, []);

  const loadData = async (
    selectedOptions: CascaderOptionType[] | undefined
  ) => {
    const targetOption = selectedOptions![selectedOptions!.length - 1];
    targetOption.loading = true;

    const result = await categoryService.FetchChildren(
      Number(targetOption.value)
    );

    if (!isError(result)) {
      targetOption.children = result.data.map((el) => ({
        label: en ? el['name:en'] : el['name:ar'],
        value: el.id,
        isLeaf: selectedOptions!.length === 2,
      }));
    }
    targetOption.loading = false;

    setOptions([...options!]);
  };

  return (
    <Cascader
      options={options}
      loadData={loadData}
      changeOnSelect
      displayRender={(label: any) => {
        return label.length > 2 && label[label.length - 1];
      }}
      onChange={(arr) => {
        onChange && arr.length > 2 && onChange(arr[arr.length - 1]);
      }}
    />
  );
};
export default CascederForm;
