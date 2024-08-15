import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe' })
    name: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    email: string;
}
