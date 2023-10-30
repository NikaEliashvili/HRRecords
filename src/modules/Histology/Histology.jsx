import React from "react";
import styles from "./Histology.module.css";
import Crud from "../../components/Crud/Crud";

import { Skeleton } from "antd";

function Histology({ histologyData }) {
  console.log(histologyData);
  return (
    <div className={styles.card}>
      <h4 className={styles.cardHeader}>ჰისტოლოგია</h4>
      <Crud data={histologyData} />
      <div className={styles.paraghraph}>
        <div>
          <span className={styles.bold}>კვლევის ნომერი:</span>
          {histologyData?.recordID || (
            <Skeleton
              active
              className={styles.skeletonAnim}
              loading={true}
              title={{ width: "100%" }}
              paragraph={{ rows: 0 }}
            />
          )}
        </div>
      </div>
      <div className={styles.paraghraph}>
        <div>
          <span className={styles.bold}>ჰემოგლობინი სისხლში:</span>
          {histologyData?.labCodeName || (
            <Skeleton
              active
              className={styles.skeletonAnim}
              loading={true}
              title={{ width: "100%" }}
              paragraph={{ rows: 0 }}
            />
          )}
        </div>
      </div>
      <div className={styles.paraghraph}>
        <div>
          <span className={styles.bold}>დასკვნა:</span>
          {histologyData?.conclusion || (
            <Skeleton
              active
              className={styles.skeletonAnim}
              loading={true}
              title={{ width: "100%" }}
              paragraph={{ rows: 0 }}
            />
          )}
        </div>
      </div>
      <div className={styles.paraghraph}>
        <div>
          <span className={styles.bold}>კომენტარი:</span>
          {histologyData?.comment || (
            <Skeleton
              active
              className={styles.skeletonAnim}
              loading={true}
              title={{ width: "100%" }}
              paragraph={{ rows: 0 }}
            />
          )}
        </div>
      </div>
      <div className={styles.paraghraph}>
        <div>
          <span className={styles.bold}>ექიმი:</span>
          {histologyData?.doctorName || (
            <Skeleton
              active
              className={styles.skeletonAnim}
              loading={true}
              title={{ width: "100%" }}
              paragraph={{ rows: 0 }}
            />
          )}
        </div>

        <div className={styles.department}>
          <span className={styles.bold}>სპეციალობა:</span>
          {histologyData?.departament || (
            <Skeleton
              active
              loading={true}
              title={{ width: "100%" }}
              paragraph={{ rows: 0 }}
              className={styles.skeletonAnim}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Histology;
