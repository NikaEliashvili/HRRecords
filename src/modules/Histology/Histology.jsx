import React from "react";
import styles from "./Histology.module.css";
import Crud from "../../components/Crud/Crud";

import { Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function Histology({ histologyData }) {
  return (
    <div className={styles.card}>
      <h4 className={styles.cardHeader}>ჰისტოლოგია</h4>
      <Crud data={histologyData} />

      <div className={styles.paraghraph}>
        <div>
          <span className={styles.bold}>კვლევის ნომერი:</span>
          {histologyData?.recordID || (
            <Spin indicator={<LoadingOutlined className={styles.loading} />} />
          )}
        </div>
      </div>
      <div className={styles.paraghraph}>
        <div>
          <span className={styles.bold}>ჰემოგლობინი სისხლში:</span>
          {histologyData?.labCodeName || (
            <Spin indicator={<LoadingOutlined className={styles.loading} />} />
          )}
        </div>
      </div>
      <div className={styles.paraghraph}>
        <div>
          <span className={styles.bold}>დასკვნა:</span>
          {histologyData?.conclusion || (
            <Spin indicator={<LoadingOutlined className={styles.loading} />} />
          )}
        </div>
      </div>
      <div className={styles.paraghraph}>
        <div>
          <span className={styles.bold}>კომენტარი:</span>
          {histologyData?.comment || (
            <Spin indicator={<LoadingOutlined className={styles.loading} />} />
          )}
        </div>
      </div>
      <div
        className={
          styles.paraghraph || (
            <Spin indicator={<LoadingOutlined className={styles.loading} />} />
          )
        }
      >
        <div>
          <span className={styles.bold}>ექიმი:</span>
          {histologyData?.doctorName || (
            <Spin indicator={<LoadingOutlined className={styles.loading} />} />
          )}
        </div>

        <div className={styles.department}>
          <span className={styles.bold}>სპეციალობა:</span>
          {histologyData?.departament || (
            <Spin indicator={<LoadingOutlined className={styles.loading} />} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Histology;
