import { IUser } from '@/models';
import UploadAvatar from './UploadAvatar';
import UpdateName from './UpdateName';
import UpdateEmail from './UpdateEmail';
import UpdateTheme from './UpdateTheme';
import env from '@/lib/env';

interface UpdateAccountProps {
    allowEmailChange: boolean;
}

const UpdateAccount = ({ allowEmailChange }: UpdateAccountProps) => {
    return (
        <div className="flex gap-6 flex-col">
            <UpdateName />
            <UpdateEmail allowEmailChange={allowEmailChange} />
            <UploadAvatar />
            {env.darkModeEnabled && <UpdateTheme />}
        </div>
    );
};

export default UpdateAccount;
