import { Button, Form, Input } from 'antd';
import React from 'react';

export const QuizForm2 = ({ handleSubmit, handleChange, formData }) => {

    const formItemLayout = {
        labelCol: {
            span: 24,
        },
        wrapperCol: {
            span: 24,
        },
    };

    return (
        <Form onFinish={handleSubmit} {...formItemLayout}>
            Wie lautet Ihre Postleitzahl?
            <Form.Item
                label="Postleitzahl"
                name="postleitzahl"
                rules={[{ required: true, message: 'Postleitzahl required' }]}
            >
                <Input name="name" value={formData.postleitzahl} onChange={handleChange} />
            </Form.Item>


        </Form>
    );
};
