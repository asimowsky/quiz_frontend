import { Button, Form, Input } from 'antd';
import React from 'react';

export const QuizForm = ({ handleSubmit, handleChange, formData }) => {

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
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
            >
                <Input name="name" value={formData.name} onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Surname"
                name="surname"
                rules={[{ required: true, message: 'Please enter your surname' }]}
            >
                <Input name="surname" value={formData.surname} onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' },
                ]}
            >
                <Input name="email" value={formData.email} onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                    { required: true, message: 'Please enter your phone number' },
                    { type: 'phone', message: 'Please enter a valid phone number' },
                ]}
            >
                <Input name="phone" value={formData.phone} onChange={handleChange} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
