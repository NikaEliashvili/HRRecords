import React, { useState, useRef } from "react";

import HistologySet from "../../modules/Histology/HistologySet";

import { HiOutlinePlus, HiX } from "react-icons/hi";
import { BiSolidEdit } from "react-icons/bi";

import { Modal, Spin, Skeleton } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./Crud.module.css";

function Crud({ data }) {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteConfirmLoading, setDeleteConfirmLoading] = useState(false);

  const onAddBtn = () => {
    showModal();
    ref.current = null;
  };
  const onEditBtn = () => {
    showModal();
    ref.current = data?.recordID;
  };
  const onDeleteBtn = () => {
    setDeleteModal(true);
    ref.current = data?.recordID;
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const deleteHandleOk = () => {
    setDeleteConfirmLoading(true);
    setTimeout(() => {
      console.log(
        `Item with RecordID: ${ref.current} is deleted successfully ! :)`
      );
      setDeleteModal(false);
      setDeleteConfirmLoading(false);
    }, 1000);
  };
  const deleteHandleCancel = () => {
    setDeleteModal(false);
  };

  return (
    <>
      <Skeleton
        active
        loading={data ? false : true}
        title={{
          width: "100%",
          style: {
            height: "40px",
          },
        }}
        className={styles.crudSkeletonAnim}
        paragraph={{
          rows: 0,
          style: {
            display: "none",
          },
        }}
      >
        <div className={styles.crud}>
          <div className={styles.date}>{data?.recordDate}</div>
          <div className={styles.buttons}>
            <div className={styles.button} onClick={onAddBtn}>
              <HiOutlinePlus className={styles.iconPlus} />
            </div>
            <div className={styles.button} onClick={onEditBtn}>
              <BiSolidEdit className={styles.iconEdit} />
            </div>
            <div className={styles.button} onClick={onDeleteBtn}>
              <HiX className={styles.iconDelete} />
            </div>
          </div>
        </div>
        {open && (
          <HistologySet
            refID={ref.current}
            open={open}
            handleCancel={handleCancel}
          />
        )}
        {deleteModal && (
          <Modal
            title="წაშლა"
            open={deleteModal}
            onOk={deleteHandleOk}
            confirmLoading={deleteConfirmLoading}
            onCancel={deleteHandleCancel}
            cancelText="გაუქმება"
            okText="წაშლა"
            okType="danger"
            okButtonProps={{ className: styles.modalDeleteBtn }}
          >
            <p>გსურთ მონიშნული ჩანაწერის წაშლა? </p>
          </Modal>
        )}
      </Skeleton>
    </>
  );
}

export default Crud;
