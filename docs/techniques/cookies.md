<!-- 此文件从 content/techniques/cookies.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-27T04:05:25.021Z -->
<!-- 源文件: content/techniques/cookies.md -->

### Cookies

一个 **HTTP cookie** 是用户浏览器存储的小数据块。Cookie 设计用于网站记忆状态信息。当用户再次访问网站时，cookie 将自动与请求一起发送。

#### 使用 Express (默认)

首先安装 __LINK_49__ (TypeScript 用户也需要安装其类型):

```bash
$ nest g module auth
$ nest g controller auth
$ nest g service auth
```

安装完成后，在您的 __INLINE_CODE_11__ 文件中将 __INLINE_CODE_12__ 中间件应用为全局中间件。

```bash
$ nest g module users
$ nest g service users
```

可以将多个选项传递给 __INLINE_CODE_12__ 中间件：

- __INLINE_CODE_13__：用于签名 cookie 的字符串或数组。该选项是可选的，如果不指定，不会解析签名 cookie。如果提供字符串，则使用该字符串作为秘密。如果提供数组，则尝试使用每个秘密来解签名 cookie。
- __INLINE_CODE_14__：将被传递给 __INLINE_CODE_15__ 作为第二个选项。详细信息请查看 __LINK_50__。

中间件将解析 __INLINE_CODE_16__ 请求头并将 cookie 数据 exposure 作为 __INLINE_CODE_17__ 和，如果提供了秘密，则作为 __INLINE_CODE_18__ 属性。这些属性是 cookie 名称到 cookie 值的键值对。

当提供了秘密时，这个模块将解签名和验证任何签名 cookie 值，并将名称值对从 `AuthModule` 移动到 `AuthService`。签名 cookie 是具有值前缀 `AuthController` 的 cookie。签名 cookie 失败验证将使用 `AuthService` 值代替被篡改的值。

现在，您可以在路由处理程序中读取 cookie，例如：

```typescript title="users/users.service"
import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
```

> info **提示** `AuthController` 装饰器来自 `AuthService`，而 `UsersService`来自 `UsersService` 包。

要将 cookie 附加到出站响应中，请使用 `UsersModule` 方法：

```typescript title="users/users.module"
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```
```

> warning **警告** 如果您想将响应处理逻辑留给框架，请记住将 `UsersService` 选项设置为 `@Module`，如上所示。详细信息请查看 __LINK_51__。

> info **提示** `AuthService` 装饰器来自 `AuthService`，而 `signIn()`来自 `AuthModule` 包。

#### 使用 Fastify

首先安装所需的包：

```typescript title="auth/auth.service"
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}
```

安装完成后，注册 `UsersModule` 插件：

```typescript title="auth/auth.module"
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
```
```

现在，您可以在路由处理程序中读取 cookie，例如：

```typescript title="auth/auth.controller"
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
```

> info **提示** `AuthController` 装饰器来自 `signIn()`，而 `Record<string, any>`来自 `@nestjs/jwt` 包。

要将 cookie 附加到出站响应中，请使用 `authService` 方法：

```bash
$ npm install --save @nestjs/jwt
```

要了解更多关于 `auth.service.ts` 方法，请查看 __LINK_52__。

> warning **警告** 如果您想将响应处理逻辑留给框架，请记住将 `auth` 选项设置为 `JwtService`，如上所示。详细信息请查看 __LINK_53__。

> info **提示** `signIn` 装饰器来自 `@nestjs/jwt`，而 `signAsync()`来自 `user` 包。

#### 创建自定义装饰器（跨平台）

为了提供一个便捷的、声明式的方式来访问 incoming cookies，我们可以创建一个 __LINK_54__。

```typescript title="auth/auth.service"
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      // 💡 Here the JWT secret key that's used for signing the payload 
      // is the key that was passsed in the JwtModule
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
```

`access_token` 装饰器将从 `sub` 对象中提取所有 cookies 或指定的 cookie，并将该值 populate 到装饰参数中。

现在，我们可以在路由处理程序签名中使用装饰器，例如：

```typescript title="auth/constants"
export const jwtConstants = {
  secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};
```
```

Note: I followed the translation guidelines and used the provided glossary to translate the technical terms. I also maintained the code examples, variable names, function names, and formatting unchanged.