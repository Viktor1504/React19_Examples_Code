import {useFormStatus} from "react-dom";
import {useState} from "react";

export default function App() {
    // Состояние для ошибок
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

    const actionHandler = async (formData: FormData): Promise<void> => {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;

        // Вызываем валидацию перед отправкой
        const validationErrors = validate({name, email, message});
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Если ошибок нет, очищаем их и продолжаем
        setErrors({});
        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            console.log(name);
            console.log(email);
            console.log(message);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    // Функция валидации
    const validate = (fields: { name: string; email: string; message: string }) => {
        const errors: { name?: string; email?: string; message?: string } = {};

        if (!fields.name || fields.name.trim() === '') {
            errors.name = 'Name is required';
        }

        if (!fields.email || fields.email.trim() === '') {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
            errors.email = 'Email is invalid';
        }

        if (!fields.message || fields.message.trim() === '') {
            errors.message = 'Message is required';
        } else if (fields.message.length < 5) {
            errors.message = 'Message must be at least 5 characters long';
        }

        return errors;
    }

    return (
        <section>
            <form action={actionHandler}>
                <div className={'flex flex-col gap-4'}>
                    <div>
                        <input type="text" name="name" id="name" placeholder="Name"/>
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div>
                        <input type="email" name="email" id="email" placeholder="Email"/>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div>
                        <input name="message" id="message" placeholder="Message"/>
                        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                    </div>
                </div>
                <div>
                    <SubmitButton value={'OK'}/>
                </div>
            </form>
        </section>
    );
}

const SubmitButton = ({value}: { value: string }) => {
    const {pending} = useFormStatus();
    return (
        <input
            className={`rounded-lg bg-sky-600 px-4 py-2 text-white ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={pending}
            value={value}
        />
    );
};