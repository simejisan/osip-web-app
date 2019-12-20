--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4
-- Dumped by pg_dump version 11.3

-- Started on 2019-11-07 23:01:51 +07

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 210 (class 1255 OID 3596530)
-- Name: next_id(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.next_id(OUT result bigint, seq text) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
DECLARE
    our_epoch bigint := 1314220021721;
    seq_id bigint;
    now_millis bigint;
    shard_id int := 5;
BEGIN
	SELECT nextval(seq) % 1024
	INTO seq_id;
	SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()))
	INTO now_millis;
	result :=
	(now_millis - our_epoch)*1000 << 23;
result := result |
(shard_id <<10);
    result := result |
(seq_id);

END;
    $$;


ALTER FUNCTION public.next_id(OUT result bigint, seq text) OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 3805704)
-- Name: favorite_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favorite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999
    CACHE 1;


ALTER TABLE public.favorite_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 206 (class 1259 OID 3805685)
-- Name: favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorites (
    id bigint DEFAULT public.next_id('favorite_id_seq'::text) NOT NULL,
    user_id bigint,
    promotion_id bigint
);


ALTER TABLE public.favorites OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 3596548)
-- Name: function_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.function_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999
    CACHE 1;


ALTER TABLE public.function_id_seq OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 3596540)
-- Name: functions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.functions (
    id bigint DEFAULT public.next_id('function_id_seq'::text) NOT NULL,
    short text,
    name text,
    description text,
    level integer,
    parent_id bigint,
    status integer,
    on_menu integer,
    sort integer,
    icon text,
    link text
);


ALTER TABLE public.functions OWNER TO postgres;

--
-- TOC entry 3247 (class 0 OID 0)
-- Dependencies: 201
-- Name: TABLE functions; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.functions IS 'Bảng lưu tất cả danh sách chức năng của dự án';


--
-- TOC entry 207 (class 1259 OID 3805700)
-- Name: hotword_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hotword_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999999
    CACHE 1;


ALTER TABLE public.hotword_id_seq OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 3805677)
-- Name: hotwords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hotwords (
    id bigint DEFAULT public.next_id('hotword_id_seq'::text) NOT NULL,
    name text,
    count bigint,
    source text
);


ALTER TABLE public.hotwords OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 3805702)
-- Name: promotion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.promotion_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999
    CACHE 1;


ALTER TABLE public.promotion_id_seq OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 3805669)
-- Name: promotions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promotions (
    id bigint DEFAULT public.next_id('promotion_id_seq'::text) NOT NULL,
    image text,
    sale_status text,
    normal_price bigint,
    final_price bigint,
    promotion_percent text,
    promotion_url text,
    source text
);


ALTER TABLE public.promotions OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 3596550)
-- Name: role_func_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_func_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.role_func_id_seq OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 3596528)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999
    CACHE 1;


ALTER TABLE public.role_id_seq OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 3596513)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id bigint DEFAULT public.next_id('role_id_seq'::text) NOT NULL,
    name text
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 3248 (class 0 OID 0)
-- Dependencies: 197
-- Name: TABLE roles; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.roles IS 'Bảng phân quyền user cho hệ thống';


--
-- TOC entry 200 (class 1259 OID 3596535)
-- Name: roles_func; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles_func (
    id bigint DEFAULT public.next_id('role_func_id_seq'::text) NOT NULL,
    role_id bigint NOT NULL,
    func_id bigint NOT NULL
);


ALTER TABLE public.roles_func OWNER TO postgres;

--
-- TOC entry 3249 (class 0 OID 0)
-- Dependencies: 200
-- Name: TABLE roles_func; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.roles_func IS 'Bảng kết nối giữa bảng roles và bảng functions';


--
-- TOC entry 198 (class 1259 OID 3596526)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999999
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 3596505)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint DEFAULT public.next_id('user_id_seq'::text) NOT NULL,
    name text,
    email text,
    password text,
    role_id bigint,
    avatar_url text,
    created_time timestamp with time zone DEFAULT now(),
    updated_time timestamp with time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3250 (class 0 OID 0)
-- Dependencies: 196
-- Name: TABLE users; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.users IS 'Bảng danh sách thông tin của từng user';


--
-- TOC entry 3238 (class 0 OID 3805685)
-- Dependencies: 206
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorites (id, user_id, promotion_id) FROM stdin;
\.


--
-- TOC entry 3233 (class 0 OID 3596540)
-- Dependencies: 201
-- Data for Name: functions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.functions (id, short, name, description, level, parent_id, status, on_menu, sort, icon, link) FROM stdin;
1425202424947151880	A hi hi short	test name	\N	0	123	1	0	0	strinlsl	abc
1425631149924815881	A hi hi short	A hi hi name	\N	0	123	1	0	0	strinlsl	abc
1415532557738447873	New Short	New Name	New Description	0	4567	1	0	1	abc123	124abc
\.


--
-- TOC entry 3237 (class 0 OID 3805677)
-- Dependencies: 205
-- Data for Name: hotwords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hotwords (id, name, count, source) FROM stdin;
\.


--
-- TOC entry 3236 (class 0 OID 3805669)
-- Dependencies: 204
-- Data for Name: promotions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.promotions (id, image, sale_status, normal_price, final_price, promotion_percent, promotion_url, source) FROM stdin;
\.


--
-- TOC entry 3229 (class 0 OID 3596513)
-- Dependencies: 197
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name) FROM stdin;
1410453112988111873	admin
1414486229885391874	member
\.


--
-- TOC entry 3232 (class 0 OID 3596535)
-- Dependencies: 200
-- Data for Name: roles_func; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles_func (id, role_id, func_id) FROM stdin;
1426062215324111877	1410453112988111873	1415532557738447873
1426069781848527880	1414486229885391874	1425202424947151880
1426070704595407881	1414486229885391874	1425202424947151880
1426070771704271882	1410453112988111873	1425202424947151880
\.


--
-- TOC entry 3228 (class 0 OID 3596505)
-- Dependencies: 196
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, role_id, avatar_url, created_time, updated_time) FROM stdin;
1410485283299791873	Nguyen Van Test	abc@gmail.com	1234567	1410453112988111873	\N	2019-11-07 22:54:35.328351+07	2019-11-07 22:54:35.328351+07
1414426352001487900	Nguyen Van ABC	hihi@gmail.com	$2b$10$3twSt8.PBKdZHa0a6A72g.xYTu8MlBZqcOMOAOcTObgwVp9UPxntq	1410453112988111873	\N	2019-11-07 22:54:35.328351+07	2019-11-07 22:54:35.328351+07
1415577814278607901	Nguyen Van Test	ahihi@gmail.com	$2b$10$YeZj/Add3NKzxYwnEh.Pz.sPkZ/r3/gwRCl5qIldM7YlpA/IcRJvm	1410453112988111873	\N	2019-11-07 22:54:35.328351+07	2019-11-07 22:54:35.328351+07
\.


--
-- TOC entry 3251 (class 0 OID 0)
-- Dependencies: 209
-- Name: favorite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorite_id_seq', 1, false);


--
-- TOC entry 3252 (class 0 OID 0)
-- Dependencies: 202
-- Name: function_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.function_id_seq', 10, true);


--
-- TOC entry 3253 (class 0 OID 0)
-- Dependencies: 207
-- Name: hotword_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hotword_id_seq', 1, false);


--
-- TOC entry 3254 (class 0 OID 0)
-- Dependencies: 208
-- Name: promotion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.promotion_id_seq', 1, false);


--
-- TOC entry 3255 (class 0 OID 0)
-- Dependencies: 203
-- Name: role_func_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_func_id_seq', 10, true);


--
-- TOC entry 3256 (class 0 OID 0)
-- Dependencies: 199
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 2, true);


--
-- TOC entry 3257 (class 0 OID 0)
-- Dependencies: 198
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 29, true);


--
-- TOC entry 3091 (class 2606 OID 3596520)
-- Name: roles Rule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "Rule_pkey" PRIMARY KEY (id);


--
-- TOC entry 3089 (class 2606 OID 3596512)
-- Name: users User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 3101 (class 2606 OID 3805689)
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id);


--
-- TOC entry 3095 (class 2606 OID 3596547)
-- Name: functions functions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.functions
    ADD CONSTRAINT functions_pkey PRIMARY KEY (id);


--
-- TOC entry 3099 (class 2606 OID 3805684)
-- Name: hotwords hotwords_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotwords
    ADD CONSTRAINT hotwords_pkey PRIMARY KEY (id);


--
-- TOC entry 3097 (class 2606 OID 3805676)
-- Name: promotions promotion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotion_pkey PRIMARY KEY (id);


--
-- TOC entry 3093 (class 2606 OID 3596539)
-- Name: roles_func roles_func_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_func
    ADD CONSTRAINT roles_func_pkey PRIMARY KEY (id);


--
-- TOC entry 3104 (class 2606 OID 3596561)
-- Name: roles_func function_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_func
    ADD CONSTRAINT function_id_fkey FOREIGN KEY (func_id) REFERENCES public.functions(id);


--
-- TOC entry 3106 (class 2606 OID 3805695)
-- Name: favorites promotion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT promotion_id_fkey FOREIGN KEY (promotion_id) REFERENCES public.promotions(id);


--
-- TOC entry 3102 (class 2606 OID 3596521)
-- Name: users role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- TOC entry 3103 (class 2606 OID 3596556)
-- Name: roles_func role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_func
    ADD CONSTRAINT role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- TOC entry 3105 (class 2606 OID 3805690)
-- Name: favorites user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2019-11-07 23:01:52 +07

--
-- PostgreSQL database dump complete
--

