<?php

namespace Sprint\Migration;


class ForumTagsHLBlock20260423174103 extends Version
{
    protected $author = "admin";

    protected $description = "Справочник - теги форума";

    protected $moduleVersion = "5.6.2";

    /**
     * @return bool|void
     * @throws Exceptions\HelperException
     */
    public function up()
    {
        $helper = $this->getHelperManager();
        $hlblockId = $helper->Hlblock()->saveHlblock(array(
            'NAME' => 'ForumTags',
            'TABLE_NAME' => 'site_forum_tags',
            'LANG' =>
                array(
                    'ru' =>
                        array(
                            'NAME' => 'Теги форума',
                        ),
                    'en' =>
                        array(
                            'NAME' => 'Forum Tags',
                        ),
                ),
        ));
        $helper->Hlblock()->saveField($hlblockId, array(
            'FIELD_NAME' => 'UF_XML_ID',
            'USER_TYPE_ID' => 'string',
            'XML_ID' => 'a94df7d0-f2ff-46b7-a5ec-65774a92cb6c',
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
            'FIELD_NAME' => 'UF_DESCRIPTION',
            'USER_TYPE_ID' => 'string',
            'XML_ID' => '',
            'SORT' => '100',
            'MULTIPLE' => 'N',
            'MANDATORY' => 'N',
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
                    'ru' => 'Описание',
                ),
            'LIST_COLUMN_LABEL' =>
                array(
                    'ru' => 'Описание',
                ),
            'LIST_FILTER_LABEL' =>
                array(
                    'ru' => 'Описание',
                ),
            'ERROR_MESSAGE' =>
                array(
                    'ru' => NULL,
                ),
            'HELP_MESSAGE' =>
                array(
                    'ru' => NULL,
                ),
        ));
        $helper->Hlblock()->saveField($hlblockId, array(
            'FIELD_NAME' => 'UF_FULL_DESCRIPTION',
            'USER_TYPE_ID' => 'string',
            'XML_ID' => '',
            'SORT' => '100',
            'MULTIPLE' => 'N',
            'MANDATORY' => 'N',
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
                    'ru' => 'Полное описание',
                ),
            'LIST_COLUMN_LABEL' =>
                array(
                    'ru' => 'Полное описание',
                ),
            'LIST_FILTER_LABEL' =>
                array(
                    'ru' => 'Полное описание',
                ),
            'ERROR_MESSAGE' =>
                array(
                    'ru' => NULL,
                ),
            'HELP_MESSAGE' =>
                array(
                    'ru' => NULL,
                ),
        ));
        $helper->Hlblock()->saveField($hlblockId, array(
            'FIELD_NAME' => 'UF_SORT',
            'USER_TYPE_ID' => 'integer',
            'XML_ID' => '6b4d51fa-5279-4cb4-b282-7fef13d4b899',
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
            'FIELD_NAME' => 'UF_CODE',
            'USER_TYPE_ID' => 'string',
            'XML_ID' => '2728006b-fcf6-4ee5-97e5-b370233421fd',
            'SORT' => '300',
            'MULTIPLE' => 'N',
            'MANDATORY' => 'N',
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
                    'en' => 'Code',
                    'ru' => 'Код',
                ),
            'LIST_COLUMN_LABEL' =>
                array(
                    'en' => 'Code',
                    'ru' => 'Код',
                ),
            'LIST_FILTER_LABEL' =>
                array(
                    'en' => 'Code',
                    'ru' => 'Код',
                ),
            'ERROR_MESSAGE' =>
                array(
                    'en' => 'Code',
                    'ru' => 'Код',
                ),
            'HELP_MESSAGE' =>
                array(
                    'en' => 'Code',
                    'ru' => 'Код',
                ),
        ));
        $helper->Hlblock()->saveField($hlblockId, array(
            'FIELD_NAME' => 'UF_NAME',
            'USER_TYPE_ID' => 'string',
            'XML_ID' => 'b7f06ec7-afc1-46a4-82c2-c4a781ee147f',
            'SORT' => '400',
            'MULTIPLE' => 'N',
            'MANDATORY' => 'N',
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
                    'en' => 'Name',
                    'ru' => 'Название',
                ),
            'LIST_COLUMN_LABEL' =>
                array(
                    'en' => 'Name',
                    'ru' => 'Название',
                ),
            'LIST_FILTER_LABEL' =>
                array(
                    'en' => 'Name',
                    'ru' => 'Название',
                ),
            'ERROR_MESSAGE' =>
                array(
                    'en' => 'Name',
                    'ru' => 'Название',
                ),
            'HELP_MESSAGE' =>
                array(
                    'en' => 'Name',
                    'ru' => 'Название',
                ),
        ));
    }

    public function down()
    {
    }
}
