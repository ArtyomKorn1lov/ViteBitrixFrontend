<?php

namespace Main\Site\Forum\Interfaces;

use Main\Site\Forum\Models\Group;
use Main\Site\Forum\Models\Topic;

interface TopicRepositoryInterface
{
    /**
     * @param int $page
     * @return Group[]
     * @throws \Throwable
     */
    public function getGroups(int $page = 1): array;

    /**
     * @param int $groupId
     * @param int $page
     * @return Topic[]
     * @throws \Throwable
     */
    public function getItems(int $groupId = 0, int $page = 1): array;
}