package com.qcloud.bot.controller;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qcloud.bot.auth.JwtTokenProvider;
import com.qcloud.bot.model.RequestDto;
import com.qcloud.bot.model.auth.AuthPage;
import com.qcloud.bot.model.auth.Sign;
import com.qcloud.bot.model.auth.UserAuth;
import com.qcloud.bot.service.auth.CustomUserDetailService;

@Controller
public class SignController {

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    // signin is login
    @PostMapping(value = "/signin")
    @ResponseBody
    public Sign signInUser(HttpServletRequest request, @RequestBody UserAuth user) {
        UserAuth result = customUserDetailService.getUserByUserId(user.getUserId()).get(0);
        Sign signVO = new Sign();
        if (!passwordEncoder.matches(user.getPassword(), result.getPassword())) {
            signVO.setResult("fail");
            signVO.setMessage("ID or Password is invalid.");
            return signVO;
        }
        List<String> roleList = Arrays.asList(result.getRoles().split(","));
        signVO.setResult("success");
        signVO.setToken(jwtTokenProvider.createToken(result.getUsername(), roleList));
        result.setPassword(null);
        signVO.setRoles(result.getRoles());
        return signVO;
    }

    // signup, register id & password
    @PostMapping(value = "/signup")
    @ResponseBody
    public Sign addUser(HttpServletRequest request, @RequestBody UserAuth signupUser) {
        UserAuth user = signupUser;
        // user.setRoles("ROLE_USER");//spring security automatically add ROLE_ at front of role name!!
        user.setName(user.getUserId());
        user.setPassword(passwordEncoder.encode(signupUser.getPassword()));
        Sign signVO = new Sign();
        UserAuth result = customUserDetailService.signInUser(user);
        System.out.println("result" + result);
        if (result != null) {
            signVO.setResult("success");
            signVO.setMessage("SignUp complete");
            return signVO;
        } else {
            signVO.setResult("fail");
            signVO.setMessage("Ask system admin");
            return signVO;
        }
    }

    @RequestMapping(value = "/authpage", method = RequestMethod.GET)
    @ResponseBody
    public AuthPage getAuthPage() {
        return customUserDetailService.getAuthPage();
    }

    @RequestMapping(value = "/authpage", method = RequestMethod.PUT)
    @ResponseBody
    public AuthPage insertAuthPage(@RequestBody RequestDto request) {
        return customUserDetailService.insertAuthPage(request.getAuthPage());
    }
}