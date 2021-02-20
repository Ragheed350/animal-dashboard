import { FetchCategoriesAsync, RootState } from '@core'
import { TreeSelect } from 'antd'
import { GetServerSideProps } from 'next'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const index: React.FC<{ name: string }> = () => {
  const dispatch = useDispatch()
  // const { t } = useTranslation('home')

  const { categories, status } = useSelector((state: RootState) => state.Category);

  useEffect(() => {
    dispatch(FetchCategoriesAsync());
  }, [])

  const treeData: { id: number, pId: number, value: string, title: string, isLeaf: boolean }[] = categories.map(el => ({ id: el.id, pId: el.parent_id === null ? 0 : Number(el.parent_id), value: el.id.toString(), title: el['name:en'], isLeaf: false }))

  return <TreeSelect
    style={{ width: '100%' }}
    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
    // loadData={(treeNode): Promise<unknown> =>
    //     new Promise(resolve => {
    //         const { id } = treeNode.props;
    //         setTimeout(() => {
    //             setTreeData(tree =>
    //                 tree!.concat([
    //                     genTreeNode(id, false),
    //                     genTreeNode(id, true),
    //                 ]),
    //             );
    //             resolve();
    //         }, 300);
    //     })}
    treeData={treeData}
    onChange={(val) => console.log(val)}
    loading={status === 'loading'}
    treeDataSimpleMode
  />

}
export default index

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: { name: 'hell' } }
}