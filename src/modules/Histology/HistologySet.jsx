import { Form, Input, Select, Modal, DatePicker, Checkbox, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { selectOptions, selectOptions2 } from "../../selectOptions";
import { fetchHistologyData } from "./HistologyAPI";
import styles from "./Histology.module.css";

const dateFormat = "DD/MM/YYYY HH:mm";
const { TextArea } = Input;

// Custom Label Component
const CustomLabel = ({ label }) => (
  <label className={styles.customLabel}>{label}</label>
);

function HistologySet({ refID, open, handleCancel }) {
  const [histologyData, setHistologyData] = useState(null);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  console.log("RecordID: ", refID);
  // console.log(histologyData);
  useEffect(() => {
    if (refID !== null) {
      fetchHistologyData(refID).then((res) => {
        console.log(res);
        setHistologyData(res);
      });
      console.log("Histology Data: ", histologyData);
    }
  }, [refID]);

  const handleOk = () => {
    console.log("handle OK");
    form
      .validateFields()
      .then((values) => {
        onFinish(values);
        setConfirmLoading(true);
        setTimeout(() => {
          handleCancel();
          setConfirmLoading(false);
          form.resetFields();
        }, 1000);
      })
      .catch((errorInfo) => {
        console.log("Validation Error:", errorInfo);
      });
  };
  const onFinish = (values) => {
    if (refID === null) {
      // async funciton to add new form
      console.log("Added Object: ", values);
    } else {
      // async function to edit an existing form
      console.log("Edited Object with RecordID: " + refID + " ", values);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (refID !== null && !histologyData) {
    return (
      <Spin
        className={styles.spin}
        indicator={
          <LoadingOutlined
            className={styles.loadingSpin}
            style={{
              fontSize: 34,
              position: "absolute",
              top: "0",
              bottom: "40%",
              left: "0",
              right: "0",
              margin: "auto",
            }}
            spin
          />
        }
      ></Spin>
    );
  }

  return (
    <Modal
      title="ჰისტოლოგია"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="შენახვა"
      cancelText="გაუქმება"
      style={{
        top: "1.25rem",
        maxHeight: "93%",
        borderRadius: "1rem",
        borderTopRightRadius: "1rem",
        borderTopLeftRadius: "1rem",
        overflowY: "auto",
        overflowX: "hidden",
        paddingRight: "0.3rem",
      }}
      width={"800px"}
    >
      <Form
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="horizontal"
        size="middle"
      >
        <div className={styles.form}>
          <div className={styles.inputField}>
            <div className={styles.fieldContainer}>
              <Form.Item
                initialValue={histologyData ? 0 : null}
                label={<CustomLabel label="პათოლოგ-ანატომი:" />}
                name="pathologistAnatomist"
                labelCol={{
                  span: 24,
                }}
                rules={[
                  {
                    required: true,
                    message: "აირჩიეთ პათოლოგ-ანატომი",
                  },
                ]}
              >
                <Select placeholder="პათოლოგ-ანატომი...">
                  {selectOptions.map((opt, index) => (
                    <Select.Option key={opt} value={index}>
                      {opt}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className={styles.fieldContainer}>
              <Form.Item
                initialValue={
                  histologyData
                    ? moment(new Date(histologyData?.recordDate), dateFormat)
                    : moment()
                }
                label={<CustomLabel label="მასალის შემოსვლის თარიღი:" />}
                labelCol={{
                  span: 24,
                }}
                name="recordDate"
                format={dateFormat}
                rules={[
                  {
                    required: true,
                    message: "გთხოვთ შეიყვანოთ თარიღი",
                  },
                ]}
              >
                <DatePicker
                  showTime={{ format: "HH:mm" }}
                  format={dateFormat}
                />
              </Form.Item>
            </div>
            <div className={styles.fieldContainer}>
              <Form.Item
                valuePropName="checked"
                initialValue={false}
                labelCol={{
                  span: 20,
                }}
                name="facsimile"
                format={dateFormat}
              >
                <Checkbox defaultChecked={false} className={styles.checkbox}>
                  ფაქსიმილი
                </Checkbox>
              </Form.Item>
            </div>
          </div>
          <div className={styles.inputField}>
            <div className={styles.fieldContainer}>
              <Form.Item
                initialValue={histologyData ? 0 : null}
                label={<CustomLabel label="განყოფილება:" />}
                labelCol={{
                  span: 24,
                }}
                name="departament"
                rules={[
                  {
                    required: true,
                    message: "აირჩიეთ განყოფილება",
                  },
                ]}
              >
                <Select placeholder="განყოფილება...">
                  {selectOptions2.map((opt, index) => (
                    <Select.Option key={opt} value={index}>
                      {opt}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className={styles.fieldContainer}>
              <Form.Item
                initialValue={
                  histologyData
                    ? moment(new Date(histologyData?.releaseDate), dateFormat)
                    : moment()
                }
                label={<CustomLabel label="დიაგნოზის გაცემის თარიღი:" />}
                labelCol={{
                  span: 24,
                }}
                name="releaseDate"
                format={dateFormat}
                rules={[
                  {
                    required: true,
                    message: "გთხოვთ შეიყვანოთ თარიღი",
                  },
                ]}
              >
                <DatePicker
                  showTime={{ format: "HH:mm" }}
                  format={dateFormat}
                />
              </Form.Item>
            </div>
            <div className={styles.fieldContainer}>
              <Form.Item
                valuePropName="checked"
                initialValue={false}
                labelCol={{
                  span: 20,
                }}
                labelAlign="right"
                name="block"
              >
                <Checkbox className={styles.checkboxRed}>
                  ჩანაწერის დაბლოკვა
                </Checkbox>
              </Form.Item>
            </div>
          </div>
          <div className={styles.inputField}>
            <div className={styles.fieldContainer}>
              <Form.Item
                initialValue={
                  histologyData ? histologyData?.doctorFullName : null
                }
                label={<CustomLabel label="მკურნალი ექიმის სახელი გვარი:" />}
                labelCol={{
                  span: 24,
                }}
                name="doctorFullName"
                rules={[
                  {
                    required: true,
                    message: "აირჩიეთ განყოფილება",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className={styles.fieldContainer}>
              <Form.Item
                initialValue={
                  histologyData ? histologyData?.sendingInstitution : null
                }
                label={<CustomLabel label="გამომგზავნი დაწესებულება:" />}
                labelCol={{
                  span: 24,
                }}
                name="sendingInstitution"
                format={dateFormat}
                rules={[
                  {
                    required: true,
                    message: "გამომგზავნი დაწესებულება:",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className={styles.fieldContainer}>
              <Form.Item
                initialValue={
                  histologyData ? histologyData?.researchNumber : null
                }
                label={<CustomLabel label="კვლევის ნომერი:" />}
                labelCol={{
                  span: 24,
                }}
                name="researchNumber"
                format={dateFormat}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className={styles.textArea}>
            <Form.Item
              initialValue={histologyData ? histologyData?.diagnosis : null}
              label={<CustomLabel label="კლინიკური დიაგნოზი:" />}
              labelCol={{ span: 24 }}
              name="diagnosis"
            >
              <TextArea
                autoSize={{
                  minRows: 3,
                  maxRows: 6,
                }}
                width="100%"
              />
            </Form.Item>
          </div>
          <div className={styles.inputField}>
            <div className={styles.fieldContainer}>
              <Form.Item
                initialValue={histologyData ? histologyData?.medCodeName : null}
                label={<CustomLabel label="მასალის სახე:" />}
                labelCol={{
                  span: 24,
                }}
                name="medCodeName"
              >
                <Input />
              </Form.Item>
            </div>
            <div className={styles.fieldContainer}>
              <Form.Item
                initialValue={histologyData ? histologyData?.material : null}
                label={<CustomLabel label="ორგანო:" />}
                labelCol={{
                  span: 24,
                }}
                name="material"
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className={styles.textArea}>
            <Form.Item
              initialValue={histologyData ? histologyData?.macroscopy : null}
              label={<CustomLabel label="მაკროსკოპია:" />}
              labelCol={{ span: 24 }}
              name="macroscopy"
            >
              <TextArea
                autoSize={{
                  minRows: 3,
                  maxRows: 6,
                }}
                width="100%"
              />
            </Form.Item>
          </div>
          <div className={styles.textArea}>
            <Form.Item
              initialValue={histologyData ? histologyData?.microscopy : null}
              label={<CustomLabel label="მიკროსკოპია:" />}
              labelCol={{ span: 24 }}
              name="microscopy"
            >
              <TextArea
                autoSize={{
                  minRows: 3,
                  maxRows: 6,
                }}
                width="100%"
              />
            </Form.Item>
          </div>
          <div className={styles.textArea}>
            <Form.Item
              initialValue={histologyData ? histologyData?.conclusion : null}
              label={<CustomLabel label="ჰისტოპათოლოგიური დასკვნა:" />}
              labelCol={{ span: 24 }}
              name="conclusion"
            >
              <TextArea
                autoSize={{
                  minRows: 3,
                  maxRows: 6,
                }}
                width="100%"
              />
            </Form.Item>
          </div>
          <div className={styles.textArea}>
            <Form.Item
              initialValue={histologyData?.comment || null}
              label={<CustomLabel label="შენიშვნა:" />}
              labelCol={{ span: 24 }}
              name="comment"
            >
              <TextArea
                autoSize={{
                  minRows: 3,
                  maxRows: 6,
                }}
                width="100%"
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default HistologySet;
