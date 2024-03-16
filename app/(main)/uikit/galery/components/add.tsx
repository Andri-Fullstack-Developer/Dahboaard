import React, { useState, useRef, useEffect, useMemo } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface DropdownItem {
    name: string;
    code: string;
}

import { supabase } from '@/DB/supabase';

const CDMURL = 'https://kkpffydweumgewhvxzow.supabase.co/storage/v1/object/public/Galery/';

const Add = ({ onBackButtonClick }: { onBackButtonClick: () => void }) => {
    const toast = useRef<Toast | null>(null);

    const [imgId, setImgId] = useState<string>('');
    const [dropdownItem, setDropdownItem] = useState<DropdownItem | null>(null);

    const dropdownItems: DropdownItem[] = useMemo(
        () => [
            { name: 'Web Desain', code: 'Web Desain' },
            { name: 'Camera', code: 'Camera' },
            { name: 'Mobile Desain', code: 'Mobile Desain' }
        ],
        []
    );

    useEffect(() => {
        setDropdownItem(dropdownItems[0]);
    }, [dropdownItems]);

    const leftToolbarNew = () => {
        return (
            <React.Fragment>
                <Button label="Back" icon="pi pi-arrow-left" onClick={handleBackButtonClick} />
            </React.Fragment>
        );
    };

    const rightToolbarNew = () => {
        return (
            <React.Fragment>
                <h5>New Image</h5>
            </React.Fragment>
        );
    };

    const randomChar = () => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        return alphabet[randomIndex];
    };

    const generateRandomId = () => {
        const randomSuffix = randomChar() + randomChar();
        const randomNumber = Math.floor(Math.random() * 1000);
        return 'AN' + randomSuffix + randomNumber;
    };
    const id_GaleryRendom = generateRandomId();

    const [formData, setFormData] = useState({
        id_Galery: id_GaleryRendom,
        title: '',
        content: '',
        img_url: '',
        categor: ''
    });

    const handleBackButtonClick = () => {
        if (onBackButtonClick) {
            onBackButtonClick();
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const onUpload = () => {
        toast.current?.show({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded',
            life: 3000
        });
    };

    const uploadStore = async (event: { files: File[] }) => {
        try {
            const file = event.files[0];
            const id_Galery = generateRandomId();
            const { data, error } = await supabase.storage.from('Galery').upload(id_Galery, file);
            if (error) {
                throw error;
            } else {
                // console.log('File berhasil diunggah:', data);
                console.table(data);
                const img_url = CDMURL + id_Galery;
                setFormData((prevState) => ({
                    ...prevState,
                    id_Galery: id_Galery,
                    img_url: img_url
                }));
                setImgId(id_Galery);
            }
        } catch (error) {
            console.error('Error saat mengunggah file:', error);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/galery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, categor: dropdownItem?.code || '' })
            });
            if (response.ok) {
                toast.current?.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Data saved successfully',
                    life: 3000
                });
                setTimeout(() => {
                    setFormData({ id_Galery: '', title: '', content: '', img_url: '', categor: '' });
                    onBackButtonClick();
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                }, 3000);
            } else {
                throw new Error('Failed to save data');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to save data',
                life: 3000
            });
        }
    };

    const isSubmitDisabled = () => {
        return !formData.title || !formData.content || !formData.img_url;
    };

    return (
        <div className=" p-fluid w-full mt-4">
            <Toolbar left={leftToolbarNew} right={rightToolbarNew}></Toolbar>
            <div className="flex flex-column md:flex-row gap-2 md:gap-4 mt-4">
                <div className="card p-fluid w-full ">
                    <div className="flex flex-column md:flex-row gap-3">
                        <div className="w-full">
                            <div className="field">
                                <label htmlFor="name1">Id Img</label>
                                <InputText id="name1" type="text" value={imgId} disabled />
                            </div>
                            <div className="field">
                                <label htmlFor="title">Title</label>
                                <InputText id="title" type="text" value={formData.title} onChange={onInputChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="diskripsi">Diskripsi</label>
                                <InputTextarea id="content" rows={4} value={formData.content} onChange={onInputChange} />
                            </div>

                            <div className="field ">
                                <label htmlFor="state">Category</label>
                                <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                            </div>
                        </div>
                        <div className="w-full">
                            <Toast ref={toast}></Toast>
                            <div className="field">
                                <label htmlFor="address">Images</label>
                                <FileUpload name="demo[]" url="/api/upload" onUpload={onUpload} onSelect={uploadStore} multiple={false} accept="image/*" maxFileSize={1000000} />
                            </div>
                        </div>
                    </div>
                    <Button label="Submit" onClick={handleSubmit} disabled={isSubmitDisabled()} />
                </div>
            </div>
        </div>
    );
};

export default Add;
