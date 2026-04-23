<?php

namespace Sprint\Migration;


class ForumAnswersHLBlock20260423174724 extends Version
{
    protected $author = "admin";

    protected $description = "Справочник - ответы форума";

    protected $moduleVersion = "5.6.2";

    /**
     * @return bool|void
     * @throws Exceptions\HelperException
     */
    public function up()
    {
        $helper = $this->getHelperManager();
        $hlblockId = $helper->Hlblock()->saveHlblock(array(
            'NAME' => 'ForumAnswers',
            'TABLE_NAME' => 'site_forum_ansvers',
            'LANG' =>
                array(
                    'ru' =>
                        array(
                            'NAME' => 'Ответы форума',
                        ),
                    'en' =>
                        array(
                            'NAME' => 'Forum answers',
                        ),
                ),
        ));
        $helper->Hlblock()->saveField($hlblockId, array(
            'FIELD_NAME' => 'UF_XML_ID',
            'USER_TYPE_ID' => 'string',
            'XML_ID' => '6e58cc4a-9736-4655-b897-4b9744268b03',
            'SORT' => '100',
            'MULTIPLE' => 'N',
            'MANDATORY' => 'Y',
            'SHOW_FILTER' => 'N',
            'SHOW_IN_LIST' => 'Y',
            'EDIT_IN_LIST' => 'Y',
            'IS_SEARCHABLE' => 'N',
            'SETTINGS' =>
                array(
                    'SIZE' => 20,
                    'ROWS' => 1,
                    'REGEXP' => '',
                    'MIN_LENGTH' => 0,
                    'MAX_LENGTH' => 0,
                    'DEFAULT_VALUE' => '',
                ),
            'EDIT_FORM_LABEL' =>
                array(
                    'en' => 'External code',
                    'ru' => 'Внешний код',
                ),
            'LIST_COLUMN_LABEL' =>
                array(
                    'en' => 'External code',
                    'ru' => 'Внешний код',
                ),
            'LIST_FILTER_LABEL' =>
                array(
                    'en' => 'External code',
                    'ru' => 'Внешний код',
                ),
            'ERROR_MESSAGE' =>
                array(
                    'en' => 'External code',
                    'ru' => 'Внешний код',
                ),
            'HELP_MESSAGE' =>
                array(
                    'en' => 'External code',
                    'ru' => 'Внешний код',
                ),
        ));
        $helper->Hlblock()->saveField($hlblockId, array(
            'FIELD_NAME' => 'UF_SORT',
            'USER_TYPE_ID' => 'integer',
            'XML_ID' => 'eead495c-651b-452b-85c7-983f3e456660',
            'SORT' => '200',
            'MULTIPLE' => 'N',
            'MANDATORY' => 'N',
            'SHOW_FILTER' => 'N',
            'SHOW_IN_LIST' => 'Y',
            'EDIT_IN_LIST' => 'Y',
            'IS_SEARCHABLE' => 'N',
            'SETTINGS' =>
                array(
                    'SIZE' => 20,
                    'MIN_VALUE' => 0,
                    'MAX_VALUE' => 0,
                    'DEFAULT_VALUE' => NULL,
                ),
            'EDIT_FORM_LABEL' =>
                array(
                    'en' => 'Sort',
                    'ru' => 'Сортировка',
                ),
            'LIST_COLUMN_LABEL' =>
                array(
                    'en' => 'Sort',
                    'ru' => 'Сортировка',
                ),
            'LIST_FILTER_LABEL' =>
                array(
                    'en' => 'Sort',
                    'ru' => 'Сортировка',
                ),
            'ERROR_MESSAGE' =>
                array(
                    'en' => 'Sort',
                    'ru' => 'Сортировка',
                ),
            'HELP_MESSAGE' =>
                array(
                    'en' => 'Sort',
                    'ru' => 'Сортировка',
                ),
        ));
        $helper->Hlblock()->saveField($hlblockId, array(
            'FIELD_NAME' => 'UF_DATETIME',
            'USER_TYPE_ID' => 'datetime',
            'XML_ID' => '3e323e0d-141f-4cbd-8420-66a39992aad8',
            'SORT' => '300',
            'MULTIPLE' => 'N',
            'MANDATORY' => 'Y',
            'SHOW_FILTER' => 'N',
            'SHOW_IN_LIST' => 'Y',
            'EDIT_IN_LIST' => 'Y',
            'IS_SEARCHABLE' => 'N',
            'SETTINGS' =>
                array(
                    'DEFAULT_VALUE' =>
                        array(
                            'TYPE' => 'NOW',
                            'VALUE' => '',
                        ),
                    'USE_SECOND' => 'Y',
                    'USE_TIMEZONE' => 'N',
                ),
            'EDIT_FORM_LABEL' =>
                array(
                    'en' => 'Date created',
                    'ru' => 'Дата создания',
                ),
            'LIST_COLUMN_LABEL' =>
                array(
                    'en' => 'Date created',
                    'ru' => 'Дата создания',
                ),
            'LIST_FILTER_LABEL' =>
                array(
                    'en' => 'Date created',
                    'ru' => 'Дата создания',
                ),
            'ERROR_MESSAGE' =>
                array(
                    'en' => 'Date created',
                    'ru' => 'Дата создания',
                ),
            'HELP_MESSAGE' =>
                array(
                    'en' => 'Date created',
                    'ru' => 'Дата создания',
                ),
        ));
        $helper->Hlblock()->saveField($hlblockId, array(
            'FIELD_NAME' => 'UF_MESSAGE',
            'USER_TYPE_ID' => 'string',
            'XML_ID' => '33c06150-0a66-4a7f-a073-6f7854fefdc4',
            'SORT' => '400',
            'MULTIPLE' => 'N',
            'MANDATORY' => 'N',
            'SHOW_FILTER' => 'N',
            'SHOW_IN_LIST' => 'Y',
            'EDIT_IN_LIST' => 'Y',
            'IS_SEARCHABLE' => 'N',
            'SETTINGS' =>
                array(
                    'SIZE' => 100,
                    'ROWS' => 10,
                    'REGEXP' => '',
                    'MIN_LENGTH' => 0,
                    'MAX_LENGTH' => 0,
                    'DEFAULT_VALUE' => '',
                ),
            'EDIT_FORM_LABEL' =>
                array(
                    'en' => 'Message',
                    'ru' => 'Сообщение',
                ),
            'LIST_COLUMN_LABEL' =>
                array(
                    'en' => 'Message',
                    'ru' => 'Сообщение',
                ),
            'LIST_FILTER_LABEL' =>
                array(
                    'en' => 'Message',
                    'ru' => 'Сообщение',
                ),
            'ERROR_MESSAGE' =>
                array(
                    'en' => 'Message',
                    'ru' => 'Сообщение',
                ),
            'HELP_MESSAGE' =>
                array(
                    'en' => 'Message',
                    'ru' => 'Сообщение',
                ),
        ));
        $helper->Hlblock()->saveField($hlblockId, array(
            'FIELD_NAME' => 'UF_FILES',
            'USER_TYPE_ID' => 'file',
            'XML_ID' => '1685d8cd-400d-4788-a835-a834578a6e10',
            'SORT' => '500',
            'MULTIPLE' => 'Y',
            'MANDATORY' => 'N',
            'SHOW_FILTER' => 'N',
            'SHOW_IN_LIST' => 'Y',
            'EDIT_IN_LIST' => 'Y',
            'IS_SEARCHABLE' => 'N',
            'SETTINGS' =>
                array(
                    'SIZE' => 20,
                    'LIST_WIDTH' => 0,
                    'LIST_HEIGHT' => 0,
                    'MAX_SHOW_SIZE' => 0,
                    'MAX_ALLOWED_SIZE' => 100,
                    'EXTENSIONS' =>
                        array(),
                    'TARGET_BLANK' => 'Y',
                ),
            'EDIT_FORM_LABEL' =>
                array(
                    'en' => 'Attachments',
                    'ru' => 'Вложения',
                ),
            'LIST_COLUMN_LABEL' =>
                array(
                    'en' => 'Attachments',
                    'ru' => 'Вложения',
                ),
            'LIST_FILTER_LABEL' =>
                array(
                    'en' => 'Attachments',
                    'ru' => 'Вложения',
                ),
            'ERROR_MESSAGE' =>
                array(
                    'en' => 'Attachments',
                    'ru' => 'Вложения',
                ),
            'HELP_MESSAGE' =>
                array(
                    'en' => 'Attachments',
                    'ru' => 'Вложения',
                ),
        ));
        $helper->Hlblock()->saveField($hlblockId, array(
            'FIELD_NAME' => 'UF_AUTHOR_ID',
            'USER_TYPE_ID' => 'integer',
            'XML_ID' => '53756813-6648-4803-b86e-f43a9807006c',
            'SORT' => '600',
            'MULTIPLE' => 'N',
            'MANDATORY' => 'Y',
            'SHOW_FILTER' => 'N',
            'SHOW_IN_LIST' => 'Y',
            'EDIT_IN_LIST' => 'Y',
            'IS_SEARCHABLE' => 'N',
            'SETTINGS' =>
                array(
                    'SIZE' => 20,
                    'MIN_VALUE' => 0,
                    'MAX_VALUE' => 0,
                    'DEFAULT_VALUE' => NULL,
                ),
            'EDIT_FORM_LABEL' =>
                array(
                    'en' => 'User id',
                    'ru' => 'Id пользователя',
                ),
            'LIST_COLUMN_LABEL' =>
                array(
                    'en' => 'User id',
                    'ru' => 'Id пользователя',
                ),
            'LIST_FILTER_LABEL' =>
                array(
                    'en' => 'User id',
                    'ru' => 'Id пользователя',
                ),
            'ERROR_MESSAGE' =>
                array(
                    'en' => 'User id',
                    'ru' => 'Id пользователя',
                ),
            'HELP_MESSAGE' =>
                array(
                    'en' => 'User id',
                    'ru' => 'Id пользователя',
                ),
        ));
        $helper->Hlblock()->saveField($hlblockId, array(
            'FIELD_NAME' => 'UF_TOPIC',
            'USER_TYPE_ID' => 'iblock_element',
            'XML_ID' => '7473dbbd-7307-4117-abc0-ca8c48ab284b',
            'SORT' => '700',
            'MULTIPLE' => 'N',
            'MANDATORY' => 'Y',
            'SHOW_FILTER' => 'N',
            'SHOW_IN_LIST' => 'Y',
            'EDIT_IN_LIST' => 'Y',
            'IS_SEARCHABLE' => 'N',
            'SETTINGS' =>
                array(
                    'DISPLAY' => 'DIALOG',
                    'LIST_HEIGHT' => 1,
                    'IBLOCK_ID' => 'forum:topics',
                    'DEFAULT_VALUE' => '',
                    'ACTIVE_FILTER' => 'N',
                ),
            'EDIT_FORM_LABEL' =>
                array(
                    'en' => 'Linking to discussion topics',
                    'ru' => 'Привязка к темам для обсуждения',
                ),
            'LIST_COLUMN_LABEL' =>
                array(
                    'en' => 'Linking to discussion topics',
                    'ru' => 'Привязка к темам для обсуждения',
                ),
            'LIST_FILTER_LABEL' =>
                array(
                    'en' => 'Linking to discussion topics',
                    'ru' => 'Привязка к темам для обсуждения',
                ),
            'ERROR_MESSAGE' =>
                array(
                    'en' => 'Linking to discussion topics',
                    'ru' => 'Привязка к темам для обсуждения',
                ),
            'HELP_MESSAGE' =>
                array(
                    'en' => 'Linking to discussion topics',
                    'ru' => 'Привязка к темам для обсуждения',
                ),
        ));
    }

    public function down()
    {
    }
}
