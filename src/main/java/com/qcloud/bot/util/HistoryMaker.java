package com.qcloud.bot.util;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.qcloud.bot.model.newresearcher.NewResearcher;
import com.qcloud.bot.model.ticket.TicketDto;
import com.qcloud.bot.model.user.UserDto;

public class HistoryMaker {

    private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
    private static final String TO = " to ";
    private static final String Cloud_service_changed = " Cloud Service is changed from ";
    private static final String Name_ko_changed = " Name of KO is changed from ";
    private static final String Name_us_changed = " Nme of US is changed from ";
    private static final String Email_changed = " Email is changed from ";
    private static final String Major_changed = " Major is changed from ";
    private static final String Institution_changed = " Institution is changed from ";
    private static final String Private_info_changed = " Private Info is changed from ";
    private static final String Position_changed = " Position is changed from ";
    private static final String Phone_changed = " Phone is changed from ";
    private static final String Create_date_changed = " Create Date is changed from ";
    private static final String Application_date_changed = " Application Date is changed from ";
    private static final String Application_route_changed = " Application Route is changed from ";
    private static final String Perpose_changed = " Perpose is changed from ";
    private static final String Adviser_changed = " Adviser is changed from ";
    private static final String Status_changed = " Status is changed from ";
    private static final String Group_changed = "Group is changed from ";
    private static final String File_changed = "File is changed from ";
    
    private static final String Ticket_type_changed = "Ticket type is changed from ";
    private static final String Desc_changed = " Desc is changed from ";
    private static final String User_id_changed = " User ID is changed from ";

    private static final String Training_institution_changed = "Training institution is changed from ";
    private static final String Training_part_changed = "Training part is changed from ";
    private static final String Training_charge_changed = "Training charge is changed from ";
    private static final String Application_number_changed = "Application number is changed from ";
    private static final String Training_start_date_changed = "Training start date is changed from ";
    private static final String Training_extension_date_changed = "Training extension date is changed from ";
    private static final String Training_end_date_changed = "Traning end date is changed from ";
    private static final String Training_cost_changed = "Training cost is changed from ";
    private static final String Training_contry_changed = "Training cotry is changed from ";

    public static String get(UserDto prev, UserDto next) {
        String nowDate = sdf.format(new Date());
        StringBuilder result = new StringBuilder();
        if (prev.getHistory() != null && !prev.getHistory().equals("")) {
            result.append(prev.getHistory());
        }
        if (prev.getCloud_service() != null && prev.getCloud_service() != next.getCloud_service()) {
            result.append(nowDate + Cloud_service_changed + prev.getCloud_service() + TO + next.getCloud_service() + "\n");
        }
        if (prev.getName_ko() != null && !prev.getName_ko().equals("") && !prev.getName_ko().equals(next.getName_ko())) {
            result.append(nowDate + Name_ko_changed + prev.getName_ko() + TO + next.getName_ko() + "\n");
        }
        if (prev.getName_us() != null && !prev.getName_us().equals("") && !prev.getName_us().equals(next.getName_us())) {
            result.append(nowDate + Name_us_changed + prev.getName_us() + TO + next.getName_us() + "\n");
        }
        if (prev.getEmail() != null && !prev.getEmail().equals("") && !prev.getEmail().equals(next.getEmail())) {
            result.append(nowDate + Email_changed + prev.getEmail() + TO + next.getEmail() + "\n");
        }
        if (prev.getMajor() != null && !prev.getMajor().equals("") && !prev.getMajor().equals(next.getMajor())) {
            result.append(nowDate + Major_changed + prev.getMajor() + TO + next.getMajor() + "\n");
        }
        if (prev.getInstitution() != null && !prev.getInstitution().equals("") && !prev.getInstitution().equals(next.getInstitution())) {
            result.append(nowDate + Institution_changed + prev.getInstitution() + TO + next.getInstitution() + "\n");
        }
        if (prev.getPrivate_info() != null && !prev.getPrivate_info().equals("") && !prev.getPrivate_info().equals(next.getPrivate_info())) {
            result.append(nowDate + Private_info_changed + prev.getPrivate_info() + TO + next.getPrivate_info() + "\n");
        }
        if (prev.getPosition() != null && !prev.getPosition().equals("") && !prev.getPosition().equals(next.getPosition())) {
            result.append(nowDate + Position_changed + prev.getPosition() + TO + next.getPosition() + "\n");
        }
        if (prev.getPhone() != null && !prev.getPhone().equals("") && !prev.getPhone().equals(next.getPhone())) {
            result.append(nowDate + Phone_changed + prev.getPhone() + TO + next.getPhone() + "\n");
        }
        if (prev.getCreate_date() != null && !prev.getCreate_date().equals("") && !prev.getCreate_date().equals(next.getCreate_date())) {
            result.append(nowDate + Create_date_changed + prev.getCreate_date() + TO + next.getCreate_date() + "\n");
        }
        if (prev.getApplication_date() != null && !prev.getApplication_date().equals("") && !prev.getApplication_date().equals(next.getApplication_date())) {
            result.append(nowDate + Application_date_changed + prev.getApplication_date() + TO + next.getApplication_date() + "\n");
        }
        if (prev.getApplication_route() != null && !prev.getApplication_route().equals("") && !prev.getApplication_route().equals(next.getApplication_route())) {
            result.append(nowDate + Application_route_changed + prev.getApplication_route() + TO + next.getApplication_route() + "\n");
        }
        if (prev.getPerpose() != null && !prev.getPerpose().equals("") && !prev.getPerpose().equals(next.getPerpose())) {
            result.append(nowDate + Perpose_changed + prev.getPerpose() + TO + next.getPerpose() + "\n");
        }
        if (prev.getAdviser() != null && !prev.getAdviser().equals("") && !prev.getAdviser().equals(next.getAdviser())) {
            result.append(nowDate + Adviser_changed + prev.getAdviser() + TO + next.getAdviser() + "\n");
        }
        if (prev.getStatus() != null && prev.getStatus() != next.getStatus()) {
            result.append(nowDate + Status_changed + prev.getStatus() + TO + next.getStatus() + "\n");
        }
        if (prev.getGroup() != null && !prev.getGroup().equals("") && !prev.getGroup().equals(next.getGroup())) {
            result.append(nowDate + Group_changed + prev.getGroup() + TO + next.getGroup() + "\n");
        }
        if (prev.getFile1_name() != null && !prev.getFile1_name().equals("") && !prev.getFile1_name().equals(next.getFile1_name())) {
            result.append(nowDate + File_changed + prev.getFile1_name() + TO + next.getFile1_name() + "\n");
        }
        if (prev.getFile2_name() != null && !prev.getFile2_name().equals("") && !prev.getFile2_name().equals(next.getFile2_name())) {
            result.append(nowDate + File_changed + prev.getFile2_name() + TO + next.getFile2_name() + "\n");
        }
        
        return result.toString();
    }

    public static String get(TicketDto prev, TicketDto next) {
        String nowDate = sdf.format(new Date());
        StringBuilder result = new StringBuilder();
        if (prev.getHistory() != null && !prev.getHistory().equals("")) {
            result.append(prev.getHistory());
        }
        if (prev.getTicket_type() != null && prev.getTicket_type() != next.getTicket_type()) {
            result.append(nowDate + Ticket_type_changed + prev.getTicket_type() + TO + next.getTicket_type() + "\n");
        }
        if (prev.getCreate_date() != null && !prev.getCreate_date().equals(next.getCreate_date())) {
            result.append(nowDate + Create_date_changed + prev.getCreate_date() + TO + next.getCreate_date() + "\n");
        }
        if (prev.getStatus() != null && prev.getStatus() != next.getStatus()) {
            result.append(nowDate + Status_changed + prev.getStatus() + TO + next.getStatus() + "\n");
        }
        if (prev.getDesc() != null && !prev.getDesc().equals(next.getDesc())) {
            result.append(nowDate + Desc_changed + prev.getDesc() + TO + next.getDesc() + "\n");
        }
        if (prev.getUser_id() != null && !prev.getUser_id().equals(next.getUser_id())) {
            result.append(nowDate + User_id_changed + prev.getUser_id() + TO + next.getUser_id() + "\n");
        }

        return result.toString();
    }

    public static String get(NewResearcher prev, NewResearcher next) {
        String nowDate = sdf.format(new Date());
        StringBuilder result = new StringBuilder();
        if (prev.getHistory() != null && !prev.getHistory().equals("")) {
            result.append(prev.getHistory());
        }
        if (prev.getType() != null && prev.getType() != next.getType()) {
            result.append(nowDate + Ticket_type_changed + prev.getType() + TO + next.getType() + "\n");
        }
        if (prev.getName_ko() != null && !prev.getName_ko().equals("") && !prev.getName_ko().equals(next.getName_ko())) {
            result.append(nowDate + Name_ko_changed + prev.getName_ko() + TO + next.getName_ko() + "\n");
        }
        if (prev.getName_us() != null && !prev.getName_us().equals("") && !prev.getName_us().equals(next.getName_us())) {
            result.append(nowDate + Name_us_changed + prev.getName_us() + TO + next.getName_us() + "\n");
        }
        if (prev.getEmail() != null && !prev.getEmail().equals("") && !prev.getEmail().equals(next.getEmail())) {
            result.append(nowDate + Email_changed + prev.getEmail() + TO + next.getEmail() + "\n");
        }
        if (prev.getMajor() != null && !prev.getMajor().equals("") && !prev.getMajor().equals(next.getMajor())) {
            result.append(nowDate + Major_changed + prev.getMajor() + TO + next.getMajor() + "\n");
        }
        if (prev.getInstitution() != null && !prev.getInstitution().equals("") && !prev.getInstitution().equals(next.getInstitution())) {
            result.append(nowDate + Institution_changed + prev.getInstitution() + TO + next.getInstitution() + "\n");
        }
        if (prev.getPrivate_info() != null && !prev.getPrivate_info().equals("") && !prev.getPrivate_info().equals(next.getPrivate_info())) {
            result.append(nowDate + Private_info_changed + prev.getPrivate_info() + TO + next.getPrivate_info() + "\n");
        }
        if (prev.getPosition() != null && !prev.getPosition().equals("") && !prev.getPosition().equals(next.getPosition())) {
            result.append(nowDate + Position_changed + prev.getPosition() + TO + next.getPosition() + "\n");
        }
        if (prev.getPhone() != null && !prev.getPhone().equals("") && !prev.getPhone().equals(next.getPhone())) {
            result.append(nowDate + Phone_changed + prev.getPhone() + TO + next.getPhone() + "\n");
        }
        if (prev.getCreate_date() != null && !prev.getCreate_date().equals("") && !prev.getCreate_date().equals(next.getCreate_date())) {
            result.append(nowDate + Create_date_changed + prev.getCreate_date() + TO + next.getCreate_date() + "\n");
        }
        if (prev.getApplication_date() != null && !prev.getApplication_date().equals("") && !prev.getApplication_date().equals(next.getApplication_date())) {
            result.append(nowDate + Application_date_changed + prev.getApplication_date() + TO + next.getApplication_date() + "\n");
        }
        if (prev.getApplication_route() != null && !prev.getApplication_route().equals("") && !prev.getApplication_route().equals(next.getApplication_route())) {
            result.append(nowDate + Application_route_changed + prev.getApplication_route() + TO + next.getApplication_route() + "\n");
        }
        if (prev.getPerpose() != null && !prev.getPerpose().equals("") && !prev.getPerpose().equals(next.getPerpose())) {
            result.append(nowDate + Perpose_changed + prev.getPerpose() + TO + next.getPerpose() + "\n");
        }
        if (prev.getAdviser() != null && !prev.getAdviser().equals("") && !prev.getAdviser().equals(next.getAdviser())) {
            result.append(nowDate + Adviser_changed + prev.getAdviser() + TO + next.getAdviser() + "\n");
        }
        if (prev.getStatus() != null && prev.getStatus() != next.getStatus()) {
            result.append(nowDate + Status_changed + prev.getStatus() + TO + next.getStatus() + "\n");
        }
        if (prev.getGroup() != null && !prev.getGroup().equals("") && !prev.getGroup().equals(next.getGroup())) {
            result.append(nowDate + Group_changed + prev.getGroup() + TO + next.getGroup() + "\n");
        }
        if (prev.getFile_name() != null && !prev.getFile_name().equals("") && !prev.getFile_name().equals(next.getFile_name())) {
            result.append(nowDate + File_changed + prev.getFile_name() + TO + next.getFile_name() + "\n");
        }
        if (prev.getTraining_institution() != null && !prev.getTraining_institution().equals("") && !prev.getTraining_institution().equals(next.getTraining_institution())) {
            result.append(nowDate + Training_institution_changed + prev.getTraining_institution() + TO + next.getTraining_institution() + "\n");
        }
        if (prev.getTraining_part() != null && !prev.getTraining_part().equals("") && !prev.getTraining_part().equals(next.getTraining_part())) {
            result.append(nowDate + Training_part_changed + prev.getTraining_part() + TO + next.getTraining_part() + "\n");
        }
        if (prev.getTraining_charge() != null && !prev.getTraining_charge().equals("") && !prev.getTraining_charge().equals(next.getTraining_charge())) {
            result.append(nowDate + Training_charge_changed + prev.getTraining_charge() + TO + next.getTraining_charge() + "\n");
        }
        if (prev.getApplication_number() != null && !prev.getApplication_number().equals("") && !prev.getApplication_number().equals(next.getApplication_number())) {
            result.append(nowDate + Application_number_changed + prev.getApplication_number() + TO + next.getApplication_number() + "\n");
        }
        if (prev.getTraining_start_date() != null && !prev.getTraining_start_date().equals("") && !prev.getTraining_start_date().equals(next.getTraining_start_date())) {
            result.append(nowDate + Training_start_date_changed + prev.getTraining_start_date() + TO + next.getTraining_start_date() + "\n");
        }
        if (prev.getTraining_extension_date() != null && !prev.getTraining_extension_date().equals("") && !prev.getTraining_extension_date().equals(next.getTraining_extension_date())) {
            result.append(nowDate + Training_extension_date_changed + prev.getTraining_extension_date() + TO + next.getTraining_extension_date() + "\n");
        }
        if (prev.getTraining_end_date() != null && !prev.getTraining_end_date().equals("") && !prev.getTraining_end_date().equals(next.getTraining_end_date())) {
            result.append(nowDate + Training_end_date_changed + prev.getTraining_end_date() + TO + next.getTraining_end_date() + "\n");
        }
        if (prev.getTraining_cost() != null && !prev.getTraining_cost().equals("") && !prev.getTraining_cost().equals(next.getTraining_cost())) {
            result.append(nowDate + Training_cost_changed + prev.getTraining_cost() + TO + next.getTraining_cost() + "\n");
        }
        if (prev.getTraining_contry() != null && !prev.getTraining_contry().equals("") && !prev.getTraining_contry().equals(next.getTraining_contry())) {
            result.append(nowDate + Training_contry_changed + prev.getTraining_contry() + TO + next.getTraining_contry() + "\n");
        }

        return result.toString();
    }
}
